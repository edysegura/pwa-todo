import TodoService from './TodoService.js'
import HtmlService from './HtmlService.js'

TodoService
  .getList()
  .then(items => items.forEach(HtmlService.addToHtmlList))

const saveNewItem = description => {
  const newItem = { done:false, description }

  TodoService
    .saveItem(newItem)
    .then(savedItem => HtmlService.addToHtmlList(savedItem))
}

HtmlService
  .getInputedItem()
  .then(saveNewItem)

navigator.serviceWorker
  .register('sw.js')
  .then(() => console.info('Service worker registered!'))
