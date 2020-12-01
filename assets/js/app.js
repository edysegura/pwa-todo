import HtmlService from "./HtmlService.js";
import TodoService from "./TodoService.js";

class App {
  constructor() {
    this.registerServiceWorker();
    this.initialize();
  }

  initialize() {
    new HtmlService(new TodoService());
  }

  registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      const onsuccess = () => console.log("[Service Worker] Registered");
      const onfailure = () => console.log("[Service Worker] Failed");

      navigator.serviceWorker
        .register("sw.js")
        .then(onsuccess)
        .catch(onfailure);
    }
  }
}

new App();
