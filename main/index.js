const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const htmlPath = path.join(__dirname, './../build/index.html');

// Keep a global reference of the window object
let mainWindow;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', start);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    start();
  }
});
/**
 * Create a window instance
 */
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    icon: path.join(
      __dirname,
      `./../${process.env.ELECTRON_DEV ? 'public' : 'build'}/icon/icon32x32.png`
    ),
    webPreferences: {
      webSecurity: false
    },
    width: 800
  });
  // and load the index.html of the app.
  const startUrl = process.env.ELECTRON_DEV
    ? process.env.ELECTRON_START_URL
    : `file://${htmlPath}`;

  mainWindow.loadURL(startUrl);
  if (process.env.ELECTRON_DEV) {
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null;
    app.quit();
  });
  // Create the Application's main menu
  const template = [
    {
      label: 'Application',
      submenu: [
        {
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          },
          label: 'Quit'
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          accelerator: 'CmdOrCtrl+X',
          label: 'Cut',
          selector: 'cut:'
        },
        {
          accelerator: 'CmdOrCtrl+C',
          label: 'Copy',
          selector: 'copy:'
        },
        {
          accelerator: 'CmdOrCtrl+V',
          label: 'Paste',
          selector: 'paste:'
        },
        {
          accelerator: 'CmdOrCtrl+A',
          label: 'Select All',
          selector: 'selectAll:'
        }
      ]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}
/**
 * Main entry point of electron
 */
function start() {
  createWindow();
}
