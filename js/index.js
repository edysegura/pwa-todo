import TodoService from './TodoService.js'
import HtmlService from './HtmlService.js'

TodoService
  .getList()
  .then(items => items.forEach(HtmlService.addToHtmlList))

const saveItem = (item, action) => {
  TodoService
    .saveItem(item)
    .then(action)
}

const saveNewItem = description => {
  const newItem = { 'done': false, description }
  const action = savedItem => HtmlService.addToHtmlList(savedItem)
  saveItem(newItem, action)
}

const updateItem = item => {
  const action = () => console.info(`Item ${ item.description } was saved!`)
  saveItem(item, action)
}

const deleteItem = itemId => {
  TodoService
    .deleteItem(itemId)
    .then(HtmlService.removeFromHtmlList)
}

HtmlService
  .getInputtedItem()
  .then(saveNewItem)

HtmlService
  .getClickedItem()
  .then(updateItem)

HtmlService
  .getClickedButton()
  .then(deleteItem)

navigator.serviceWorker
  .register('sw.js')
  .then(() => console.info('Service worker registered!'))
