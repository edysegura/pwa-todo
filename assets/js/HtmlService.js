const doneCssClass = 'done';
export default class HtmlService {
  constructor(todoService) {
    this.todoService = todoService;
    this.bindFormEvent();
    this.listTasks();
  }

  bindFormEvent() {
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.addTask(form.item.value);
      form.reset();
      form.item.focus();
    });
  }

  async addTask(description) {
    const task = { description, done: false };
    const taskId = await this.todoService.save(task);
    task.id = taskId;
    this.addToHtmlList(task);
  }

  async listTasks() {
    const tasks = await this.todoService.getAll();
    tasks.forEach((task) => this.addToHtmlList(task));
  }

  async deleteTask(taskId, li) {
    await this.todoService.delete(taskId);
    li.remove();
  }

  async saveTask(taskId, isDone) {
    const task = await this.todoService.get(taskId);
    task.done = isDone;
    await this.todoService.save(task);
  }

  toggleTask(li, taskId) {
    li.classList.toggle(doneCssClass);
    const isDone = li.classList.contains(doneCssClass);
    this.saveTask(taskId, isDone);
  }

  addToHtmlList(task) {
    const ul = document.querySelector("ul");
    const li = document.createElement("li");
    const span = document.createElement("span");
    const button = document.createElement("button");

    li.addEventListener("click", () => this.toggleTask(li, task.id));

    if (task.done) {
      li.classList.add(doneCssClass);
    }

    span.textContent = task.description;

    button.textContent = "x";
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      this.deleteTask(task.id, li);
    });

    li.appendChild(span);
    li.appendChild(button);
    ul.appendChild(li);
  }
}
