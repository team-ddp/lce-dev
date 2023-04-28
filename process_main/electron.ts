// const { app, BrowserWindow, ipcMain } = require("electron");
// const path = require("path");
// const url = require("url");
// const {
//   default: installExtension,
//   REACT_DEVELOPER_TOOLS,
// } = require("electron-devtools-installer");
// const authenticate = require("league-connect");
// const LcuApi = require("./lcu.js");

import { userInfo_type } from "../process_renderer/types/user";

import path from "path";
import { authenticate, Credentials } from "league-connect";

import LcuApi from "./apis/lcu";
import { app, BrowserWindow, ipcMain } from "electron";
import fs from "fs";

import {
  setDefaultInfo,
  setRankInfo,
  setStatus,
} from "../process_renderer/store/user";
import { RootState } from "../process_renderer/store";

console.log("init");

app.disableHardwareAcceleration();
let mainWindow: BrowserWindow;
let getDataFromLCU: any;

const rendererEntry = path.join(__dirname, "../dist/index.html");
const preloadEntry = path.join(__dirname, "/preload.js");

const createWindow = () => {
  const { screen } = require("electron");
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;
  console.log("asdf");
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 810,
    title: "CGSP - powered py DDP",
    titleBarStyle: "hidden",
    resizable: false,
    // transparent: true,
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

const connectClient = async () => {
  console.log("연결중..");
  const credentails: Credentials = await authenticate({
    awaitConnection: true,
  });
  getDataFromLCU = await new LcuApi(credentails, connectClient);
  console.log("연결성공!");
  mainWindow.webContents.send(
    "clientConnect",
    getDataFromLCU.user,
    await getData("getRank"),
    await getData("getMatchList")
  );
};

const getData = async (method: string, id: string = "0") => {
  return new Promise((resolve, rejects) => {
    switch (method) {
      case "getMatchList":
        // const data = getDataFromLCU.getMatchList();
        resolve(getDataFromLCU.getMatchList());
        console.log("1");
      case "getRank":
        // const data = getDataFromLCU.getMatchList();
        resolve(getDataFromLCU.getRank());
        console.log("12");
      case "getUser":
        // const data = getDataFromLCU.getMatchList();
        resolve(getDataFromLCU.getUser());
        console.log("123");
      case "getState":
        // const data = getDataFromLCU.getMatchList();
        resolve(getDataFromLCU.getState());
      case "getMatchInfo":
        // const data = getDataFromLCU.getMatchList();
        resolve(getDataFromLCU.getMatchInfo(id));
    }
  });
};

// const test = async (): Promise<userInfo_type> => {
//   return getDataFromLCU.getUser();
// };
app.on("ready", async () => {
  console.log("hi");
  // ipcMain.on("fromTest", async (event, data) => {
  //   console.log(`1 Received [${data}] from renderer browser`);
  //   let ee = await getData();
  //   // console.log(JSON.stringify(ee));
  //   // event.returnValue = JSON.stringify(ee);
  //   // mainWindow.webContents.send("test", JSON.stringify(ee));
  // });

  ipcMain.on("Quit-Process", () => {
    app.quit();
  });

  ipcMain.on("Minimize-Window", () => {
    mainWindow.minimize();
  });
  ipcMain.on("Close-Window", () => {
    mainWindow.close();
  });

  ipcMain.handle("fromTest", async (event, data) => {
    console.log(`1 Received [${data}] from renderer browser`);
    // console.log(test());
    const ee: any = await getData("getMatchList");
    fs.writeFile("recentgame.json", JSON.stringify(ee), function () {
      console.log("json파일 생성완료");
    });
    event.sender.send("test", ee);
    console.log("eeeeeeeeeeeeeaef");
  });

  ipcMain.handle("saveFile", async (event, data) => {
    console.log(`1 Received from renderer browser`);
    fs.writeFile("idToChamp.json", JSON.stringify(data), function () {
      console.log("json파일 생성완료");
    });
  });
  createWindow();
  console.log("화면생성");

  // console.log("id값" + JSON.stringify(credentails));
  connectClient();
});

app.on("window-all-closed", () => {
  app.quit();
});
