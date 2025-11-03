import Dexie from "https://cdn.jsdelivr.net/npm/dexie@4.2.1/+esm";

const DB_KEY = "PWA::TODO:DB";

export default class TodoService {
  #db = [];

  constructor() {
    this.#initializeDB();
  }

  #initializeDB() {
    console.log(`[TodoService.js] initializing DB`);
    const db = new Dexie(DB_KEY);
    db.version(1).stores({
      todo: "++id",
    });
    db.on("populate", async () => {
      db.todo.bulkPut([
        {
          description: "Learn PWA",
          createdDate: new Date(),
          done: false,
        },
        {
          description: "Learn HTML5 APIs",
          createdDate: new Date(),
          done: true,
        },
        {
          description: "Eat an 🍎",
          createdDate: new Date(),
          done: false,
        },
      ]);
    });
    db.open();
    this.#db = db;
  }

  async save({ description, createdDate = new Date(), done = false }) {
    if (!description) {
      console.error(`[TodoService.js] no description provided`);
      return;
    }
    const taskRecord = {
      description,
      createdDate,
      updatedDate: new Date(),
      done,
    };
    try {
      const savedId = await this.#db.todo.put(taskRecord);
      console.log(`[TodoService.js] task ${description} saved`);
      return { id: savedId, ...taskRecord };
    } catch (error) {
      console.error(`Error when adding task: ${description}`, error);
    }
  }

  async getAll() {
    return this.#db.todo.toArray();
  }

  async delete(taskId) {
    await this.#db.todo.delete(taskId);
    console.log(`[TodoService.js] Task with ID ${taskId} has been deleted`);
    return true;
  }
}
