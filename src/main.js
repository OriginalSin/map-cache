import electron from 'electron'
import path from 'path'
import url from 'url'
import isDev from './isDev'
import reloader from 'electron-reloader'

isDev && reloader(module)

const { app, BrowserWindow } = electron

let mainWindow

function createWindow() {
	mainWindow = new BrowserWindow({ width: 800, height: 600 })

	mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, '..', 'src', 'index.html'),
			protocol: 'file:',
			slashes: true,
		})
	)

	mainWindow.webContents.openDevTools()

	mainWindow.on('closed', function() {
		mainWindow = null
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', function() {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', function() {
	if (mainWindow === null) {
		createWindow()
	}
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
