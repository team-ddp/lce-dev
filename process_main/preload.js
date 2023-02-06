const { ipcRenderer, contextBridge } = require("electron");

process.once("loaded", () => {
  contextBridge.exposeInMainWorld("api", {
    send: (channel, data) => {
      // 통신 메서드
      ipcRenderer.send(channel, data);
    },
    receive: (channel, func) => {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    },
  });
});
