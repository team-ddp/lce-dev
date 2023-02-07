const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
} = require("electron-devtools-installer");

const authenticate = require("league-connect");
const LcuApi = require("./lcu.js");

console.log("init");

app.disableHardwareAcceleration();
let mainWindow;

const rendererEntry = path.join(__dirname, "../dist/index.html");
const preloadEntry = path.join(__dirname, "/preload.js");

const createWindow = () => {
  const { screen } = require("electron");
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;
  console.log("asdf");
  mainWindow = new BrowserWindow({
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
    ? mainWindow.loadURL("http://localhost:4173")
    : mainWindow.loadFile(rendererEntry);
  mainWindow.webContents.openDevTools();
};

app.on("ready", async () => {
  console.log("hi");
  ipcMain.on("fromTest", (data) => {
    // console.log(data);
    console.log(`1 Received [${data}] from renderer browser`);
    mainWindow.webContents.send("test", " here is main!ㅎㅇ");
  });
  createWindow();
  console.log("화면생성");

  const credentails = await authenticate.authenticate({
    awaitConnection: true,
  });
  // console.log("id값" + JSON.stringify(credentails));
  console.log("연결중..");
  await new LcuApi(credentails, mainWindow);
});

app.on("window-all-closed", () => {
  app.quit();
});
