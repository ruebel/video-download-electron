import React from 'react';
import styled from 'styled-components';

import Button from '../Button';
import Downloads from './Downloads';
import ErrorText from '../typography/ErrorText';
import H1 from '../typography/H1';
import Loading from '../Loading';
import SourceDetails from './SourceDetails';
import TextInput from '../TextInput';

const ytdl = window.require('youtube-dl');

const Inner = styled.div`
  max-width: 600px;
  width: 100%;
`;

const Wrapper = styled.div`
  background: ${p => p.theme.color.dark};
  color: ${p => p.theme.color.light};
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  text-align: center;
  position: absolute;
  width: 100%;
`;

class Dashboard extends React.PureComponent {
  state = {
    downloading: 0,
    files: [],
    gettingInfo: false,
    info: null,
    infoError: null,
    source: '',
    wait: null
  };

  getInfo = () => {
    if (!this.state.source && this.state.source.length === 0) {
      return this.setState({
        infoError: null,
        wait: null
      });
    }
    this.setState({
      gettingInfo: true,
      info: null,
      infoError: null,
      wait: null
    });
    ytdl.getInfo(this.state.source, (err, info) => {
      if (err) {
        this.setState({
          gettingInfo: false,
          infoError: err.message.split('ERROR:')[1].split('.')[0]
        });
      } else {
        this.setState({
          gettingInfo: false,
          info: {
            duration: info._duration_hms,
            fileName: info._filename,
            formatId: info.format_id,
            formats: info.formats,
            id: info.id,
            size: info.size,
            src: this.state.source,
            thumbnail: info.thumbnail,
            title: info.title,
            url: info.url
          }
        });
      }
    });
  };

  handleComplete = () => {
    this.setState(state => ({
      downloading: state.downloading - 1
    }));
  };

  handlePropChange = (value, prop) => {
    this.setState(
      {
        [prop]: value
      },
      () => {
        if (prop === 'source') {
          if (this.state.wait) {
            clearTimeout(this.state.wait);
          }
          this.setState({
            wait: setTimeout(this.getInfo, 500)
          });
        }
      }
    );
  };

  startDownload = () => {
    this.setState(state => ({
      downloading: state.downloading + 1,
      files: [...state.files, this.state.info],
      info: null,
      source: ''
    }));
  };

  render() {
    return (
      <Wrapper>
        <Inner>
          <H1>Video Downloader</H1>
          <TextInput
            onChange={e => this.handlePropChange(e.target.value, 'source')}
            placeholder="Enter Video Source"
            value={this.state.source}
          />
          {this.state.gettingInfo && <Loading />}
          {this.state.info && <SourceDetails info={this.state.info} />}
          {this.state.info && (
            <Button disabled={!this.state.source} onClick={this.startDownload}>
              Download
            </Button>
          )}
          {this.state.infoError && (
            <ErrorText>{this.state.infoError}</ErrorText>
          )}
          <Downloads
            downloads={this.state.files}
            onComplete={this.handleComplete}
          />
        </Inner>
      </Wrapper>
    );
  }
}

export default Dashboard;
