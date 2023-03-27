// const { ipcRenderer, contextBridge } = require("electron");

import { ipcRenderer, contextBridge } from "electron";

declare global {
  interface Window {
    api: {
      send: (channel: string, data?: any) => string;
      receive: (
        channel: string,
        func: (event: any, ...arg: any) => void
      ) => void;
      invoke: (channel: string, data?: any) => Promise<any>;
      removeAllListeners: (channel: string) => void;
    };
  }
}

process.once("loaded", () => {
  contextBridge.exposeInMainWorld("api", {
    send: (channel: string, data?: any) => {
      // 통신 메서드
      ipcRenderer.send(channel, data);
    },
    receive: (channel: string, func: (event: any, ...arg: any) => void) => {
      ipcRenderer.on(channel, (event, ...args) => func(event, ...args));
    },
    invoke: async (channel: string, data: any) =>
      await ipcRenderer.invoke(channel, data),
    removeAllListeners: (channel: string) => {
      ipcRenderer.removeAllListeners(channel);
    },
  });
});
