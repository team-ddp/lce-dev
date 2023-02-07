const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
} = require("electron-devtools-installer");

console.log("init");
let win;

const rendererEntry = path.join(__dirname, "../dist/index.html");
const preloadEntry = path.join(__dirname, "/preload.js");

const createWindow = () => {
  const { screen } = require("electron");
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;
  console.log("asdf");
  win = new BrowserWindow({
    width: width * 0.5,
    height: height * 0.5,
    title: "CGSP - powered py DDP",
    // titleBarStyle: "hidden",
    resizable: true,
    webPreferences: {
      // enableRemoteModule: true,
      nodeIntegration: false,
      contextIsolation: true,
      preload: preloadEntry,
    },
  });
  process.env.REACT_APP_ENV === "development"
    ? win.loadURL("http://localhost:4173")
    : win.loadFile(rendererEntry);
  win.webContents.openDevTools();
};

app.on("ready", async () => {
  console.log("hi");
  ipcMain.on("fromTest", (data) => {
    // console.log(data);
    console.log(`1 Received [${data}] from renderer browser`);
    win.webContents.send("test", " here is main!");
  });
  createWindow();
});

app.on("window-all-closed", () => {
  app.quit();
});
