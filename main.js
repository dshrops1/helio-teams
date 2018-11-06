//electron entry
const {app,BrowserWindow} = require('electron');

//made global so its not collected by gc
let win;

function createBrowser(){

    win = new BrowserWindow({ width: 800, height: 600 });
    //use path and url to load file
    // Open the DevTools.
    win.webContents.openDevTools()
    win.loadFile('index.html')
    // Emitted when the window is closed.
    win.on('closed', () => {
     // Dereference the window object, usually you would store windows
     // in an array if your app supports multi windows, this is the time
     // when you should delete the corresponding element.
     win = null
   })
}

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
app.on('ready', createBrowser)

  // Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createBrowser()
    }
})

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.
