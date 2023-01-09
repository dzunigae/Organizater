//import { createApp } from "vue";
//import App from "./App.vue";

const { app, BrowserWindow } = require("electron");

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile("./App.vue");
});

//createApp(App).mount("#app");
