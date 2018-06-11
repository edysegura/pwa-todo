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
      console.error(event)
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

  static addItem(item) {
    return new Promise((resolve, reject) => {
      this.getDB().then(db => {
        const request = db
          .transaction(osName, 'readwrite')
          .objectStore(osName)
          .put(item)

        request.addEventListener('success', event =>
          resolve(event.target.result)
        )

        request.addEventListener('error', event => reject(event.target.result))
      })
    })
  }

  static getList() {
    return new Promise((resolve, reject) => {
      this.getDB().then(db => {
        const items = []
        const request = db
          .transaction(osName, 'readonly')
          .objectStore(osName)
          .openCursor()

        const addItem = (event) => {
          const cursor = event.target.result
          if(cursor) {
            items.push(cursor.value)
            cursor.continue()
          }
          else {
            resolve(items)
          }
        }

        request.addEventListener('success', addItem)
      })
    })
  }
}
