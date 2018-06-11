let dbInstance
const dbName = 'todoStore'
const osName = 'todos'
const version = 1

export default class TodoService {
  static upgradeDB(db) {
    console.info('Creating database')
    db.createObjectStore('todos', { autoIncrement: true })
  }

  static openDB(resolve, reject) {
    const request = indexedDB.open(dbName, version)

    request.addEventListener('upgradeneeded', event =>
      this.upgradeDB(event.target.result)
    )

    request.addEventListener('success', event => {
      dbInstance = event.target.result
      resolve(dbInstance)
    })

    request.addEventListener('error', event => {
      reject(event)
    })
  }

  static getDB() {
    return new Promise((resolve, reject) => {
      if (dbInstance) {
        resolve(dbInstance)
      } else {
        this.openDB(resolve, reject)
      }
    })
  }

  static getTodosStore(mode) {
    return new Promise((resolve) => {
      this.getDB().then(db => {
        const store = db
          .transaction(osName, mode)
          .objectStore(osName)
        resolve(store)
      })
    })
  }

  static addItem(item) {
    return new Promise((resolve, reject) => {
      const addItemInStore = todosStore => {
        const request = todosStore.put(item)
        request.onsuccess = event => resolve(event.target.result)
        request.onerror = event => reject(event.target.result)
      }
      this.getTodosStore('readwrite').then(addItemInStore)
    })
  }

  static getList() {
    return new Promise((resolve, reject) => {
      this.getTodosStore('readonly').then(todosStore => {
        const items = []
        const request = todosStore.openCursor()

        const addItem = event => {
          const cursor = event.target.result
          if (cursor) {
            items.push(cursor.value)
            cursor.continue()
          } else {
            resolve(items)
          }
        }

        request.addEventListener('success', addItem)
      })
    })
  }
}
