import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import H2 from '../typography/H2';
import ProgressBar from '../ProgressBar';

const ytdl = window.require('youtube-dl');
const { remote } = window.require('electron');
const fs = remote.require('fs');
const path = remote.require('path');

const Title = styled(H2)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Percent = styled(H2)`
  border-right: 2px solid ${p => p.theme.light};
  margin: 0 10px 0 0;
  padding-right: 10px;
`;

const Wrapper = styled.div`
  align-items: center;
  background: ${p => (p.complete ? p.theme.color.secondary : 'transparent')};
  border: 2px solid
    ${p => (p.paused ? p.theme.color.tertiary : p.theme.color.light)};
  display: flex;
  flex-direction: row;
  margin: 5px 0;
  overflow: hidden;
  padding: 0 5px;
  position: relative;
  cursor: pointer;

  &:hover {
    border-color: ${p => p.theme.color.primary};
  }
`;

class Download extends React.Component {
  state = {
    downloaded: 0,
    downloading: false,
    downloadPath: null,
    error: null,
    hover: false,
    percent: 0,
    video: null
  };

  componentDidMount() {
    this.startDownload();
  }

  handleClick = () => {
    if (this.state.percent === 100 && !this.state.downloading) {
      remote.shell.openItem(this.state.downloadPath);
    } else if (this.state.downloading) {
      this.stopDownload();
    } else if (this.state.percent < 100 && !this.state.downloading) {
      this.startDownload();
    }
  };

  handleComplete = info => {
    this.props.onComplete(this.props.info);
    this.setState(state => ({
      downloading: false,
      percent: 100,
      video: null
    }));
  };

  handleData = chunk => {
    this.setState(state => {
      const downloaded = state.downloaded + chunk.length;
      const percent = state.size
        ? (downloaded / state.size * 100).toFixed(0)
        : 0;
      return {
        downloaded,
        percent
      };
    });
  };

  handleError = err => {
    console.error(err);
    this.setState({
      downloading: false,
      error: err,
      video: null
    });
  };

  handleInfo = info => {
    // Size only comes after the download starts since the format
    // could change
    this.setState({
      size: info.size
    });
  };

  startDownload = () => {
    const { info } = this.props;
    const format = info.formats.find(f => f.format_id === info.formatId);
    // Start the download
    const video = ytdl(info.src, [], { start: this.state.downloaded });
    const file =
      info.fileName.slice(0, info.fileName.lastIndexOf('.')) + '.' + format.ext;
    const downloadPath = path.join(remote.app.getPath('downloads'), file);
    this.setState({
      downloading: true,
      downloadPath,
      video
    });
    video.pipe(
      fs.createWriteStream(downloadPath, {
        flags: 'a'
      })
    );
    // Initial video information
    video.on('info', this.handleInfo);
    // New data chunk received
    video.on('data', this.handleData);
    // Will be called if download was already completed and there is nothing more to download.
    video.on('complete', this.handleComplete);
    // Donwload complete
    video.on('end', this.handleComplete);
    // Error while downloading
    video.on('error', this.handleError);
  };

  stopDownload = () => {
    if (this.state.video) {
      this.state.video.removeSource();
      this.setState({
        downloading: false,
        video: null
      });
    }
  };

  render() {
    const { downloading, hover } = this.state;
    const percent = Number.parseInt(this.state.percent, 10);
    const paused = !downloading && percent < 100;
    let text = this.props.info.title;
    if (hover) {
      if (downloading) {
        text = 'Pause Download';
      } else if (paused) {
        text = 'Resume Download';
      }
    }
    return (
      <Wrapper
        complete={percent === 100}
        onClick={this.handleClick}
        onMouseOut={() => this.setState({ hover: false })}
        onMouseOver={() => this.setState({ hover: true })}
        paused={paused}
      >
        {percent < 100 && (
          <Percent>{downloading ? `${percent}%` : 'Paused'}</Percent>
        )}
        <Title>{text}</Title>
        {percent < 100 && <ProgressBar percent={percent} />}
      </Wrapper>
    );
  }
}

Download.propTypes = {
  info: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired
};

export default Download;
