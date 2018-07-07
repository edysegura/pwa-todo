import TodoService from './TodoService.js'
import HtmlService from './HtmlService.js'

TodoService
  .getList()
  .then(items => items.forEach(HtmlService.addToHtmlList))

const saveNewItem = description => {
  const newItem = { 'done': false, description }
  TodoService
    .saveItem(newItem)
    .then(savedItem => HtmlService.addToHtmlList(savedItem))
}

const updateItem = item => {
  TodoService
    .saveItem(item)
    .then(() => console.info(`Item ${ item.description } was saved!`))
}

HtmlService
  .getInputedItem()
  .then(saveNewItem)

HtmlService
  .getClickedItem()
  .then(updateItem)

navigator.serviceWorker
  .register('sw.js')
  .then(() => console.info('Service worker registered!'))
