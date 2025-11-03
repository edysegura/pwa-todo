import HtmlService from "./HtmlService.js";
import TodoService from "./TodoService.js";

class App {
  constructor() {
    this.#registerServiceWorker();
    const todoService = new TodoService();
    window.htmlService = new HtmlService(todoService);
  }

  #registerServiceWorker() {
    // prettier-ignore
    navigator.serviceWorker
      .register("./sw.js", { type: 'module' })
      .then(() => console.log(`👁️ [app.js] SW registered`))
      .catch(() => console.log(`👁️ [app.js] SW failed to register`));
  }
}

new App();
