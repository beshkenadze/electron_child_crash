const { app, BrowserWindow } = require('electron');
const path = require('path');
const { ipcMain } = require('electron');
const { fork } = require('child_process');
const { dialog } = require('electron');
const utilityProcess = require('child_process');


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  ipcMain.on('test', () => {
    const child = utilityProcess.fork(__dirname + '/child_llama2.mjs', {
      serviceName: 'llm-utility',
      execArgv: ['--max-old-space-size=20000', '--max-semi-space-size=1000'],

    });

    child.on('message', (message) => {
      console.log('Message from child:', message);
      dialog.showMessageBox(mainWindow, {
        type: 'info',
        title: 'Message from child',
        message: JSON.stringify(message),
      });
    });
    child.on('exit', (code) => {
      console.log('Child exited', code);
    });
    child.on('error', (err) => {
      console.log('Child error', err);
    });
    child.send({});
    app.on('before-quit', () => {
      child.kill();
    });
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
