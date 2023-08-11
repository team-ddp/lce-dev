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
// import installExtension, {
//   REACT_DEVELOPER_TOOLS,
// } from "electron-devtools-installer";

console.log("init");

// app.whenReady().then(() => {
//   installExtension(REACT_DEVELOPER_TOOLS)
//     .then((name: any) => console.log(`add Extension : ${name}`))
//     .catch((err) => console.log("error occurred: ", err));
// });

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
      devTools: true,
      nodeIntegration: false,
      contextIsolation: true,
      preload: preloadEntry,
    },
  });
  // installExtension(REACT_DEVELOPER_TOOLS)
  //   .then((name: any) => console.log(`add Extension : ${name}`))
  //   .catch((err) => console.log("error occurred: ", err));
  process.env.REACT_APP_ENV === "development"
    ? mainWindow.loadURL("http://localhost:4173")
    : mainWindow.loadFile(rendererEntry);
  mainWindow.webContents.openDevTools();
};

const connectClient = async () => {
  console.log("LCU 연결중..");
  mainWindow.webContents.send("clientConnect", false);
  const credentails: Credentials = await authenticate({
    awaitConnection: true,
  });
  getDataFromLCU = await new LcuApi(credentails, connectClient);
  mainWindow.webContents.send("clientConnect", true);
  console.log("LCU 연결성공!");
};

const getData = async (method: string, data: string = "0") => {
  if (getDataFromLCU) {
    return new Promise((resolve, rejects) => {
      switch (method) {
        case "getMatchList":
          resolve(getDataFromLCU.getMatchList());
          break;
        case "getRank":
          resolve(getDataFromLCU.getRank());
          break;
        case "getUser":
          resolve(getDataFromLCU.getUser());
          break;
        case "getState":
          resolve(getDataFromLCU.getState());
          break;
        case "getMatchInfo":
          resolve(getDataFromLCU.getMatchInfo(data));
          break;
        case "getUserNameToAccountid":
          resolve(
            getDataFromLCU.getUserNameToAccountid(encodeURIComponent(data))
          );
          break;
        case "searchRecentMatchList":
          resolve(getDataFromLCU.searchMatchList(data));
          break;
        case "getRankUsePuuid":
          resolve(getDataFromLCU.getRankUsePuuid(data));
          break;
      }
    });
  }
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

  ipcMain.handle("getMatchDetail", async (event, data) => {
    console.log(`1 Received [${data}] from renderer browser`);
    const ee: any = await getData("getMatchInfo", data);
    console.log("eeeeeeeeeeeeeaef");
    return ee;
    // event.sender.send("giveMathchDetail", ee);
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

  ipcMain.handle("getMatchInfo", async (event, data) => {
    console.log(`1 Received [${data}] from renderer browser`);
    let matchData = await getData("getMatchInfo", data);
    fs.writeFile("recentgame.json", JSON.stringify(matchData), function () {
      console.log("json파일 생성완료");
    });
    // for (let i = 0; i < data.length; i++) {
    //   let matchData = await getData("getMatchList");
    //   fs.writeFile(
    //     `${data[i].gameId}.json`,
    //     JSON.stringify(matchData),
    //     function () {
    //       console.log("json파일 생성완료");
    //     }
    //   );
    // }
  });

  ipcMain.handle("saveFile", async (event, data) => {
    console.log(`1 Received from renderer browser`);
    fs.writeFile("idToChamp.json", JSON.stringify(data), function () {
      console.log("json파일 생성완료");
    });
  });
  ipcMain.handle("getUserAccountid", async (event, data) => {
    console.log(`1 Received [${data}] from Search renderer browser`);
    const lcuData: any = await getData("getUserNameToAccountid", data);
    return lcuData;
  });
  // ipcMain.handle("searchRecentMatchList", async (event, data) => {
  //   console.log(
  //     `1 Received [${data}] from searchRecentMatchList renderer browser`
  //   );
  //   const lcuData: any = await getData("searchRecentMatchList", data);
  //   return lcuData;
  // });
  // ipcMain.handle("getInfoDatas", async () => {
  //   mainWindow.webContents.send(
  //     "clientConnect",
  //     // getDataFromLCU.user,
  //     await getData("getUser"),
  //     await getData("getRank"),
  //     await getData("getMatchList")
  //   );
  // });
  ipcMain.handle("searchRecentMatchList", async (event, data) => {
    console.log(
      `1 Received [${data}] from searchRecentMatchList renderer browser`
    );
    let lcuData: any = [];
    lcuData.push(await getData("searchRecentMatchList", data));
    lcuData.push(await getData("getRankUsePuuid", data));
    return lcuData;
  });
  ipcMain.handle("getInfo", async (event, data) => {
    console.log(`1 Received [${data}] from sideNav page renderer browser`);
    let lcuData: any = [];
    lcuData.push(await getData("getUser"));
    lcuData.push(await getData("getRank"));
    lcuData.push(await getData("getMatchList"));
    // 클라가 안켜져있을때 sidenav렌더막기
    if (!getDataFromLCU) {
      lcuData.push(false);
    } else {
      lcuData.push(true);
    }

    return lcuData;
  });

  createWindow();
  console.log("화면생성");
  // console.log("id값" + JSON.stringify(credentails));
  connectClient();
});

app.on("window-all-closed", () => {
  app.quit();
});
