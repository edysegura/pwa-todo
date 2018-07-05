import TodoService from './TodoService.js'
import HtmlService from './HtmlService.js'

TodoService
  .getList()
  .then(items => items.forEach(HtmlService.addToHtmlList))

const addToDB = (description) => {
  const newItem = { done:false, description }

  TodoService
    .addItem(newItem)
    .then(() => HtmlService.addToHtmlList(newItem))
}

HtmlService
  .getInputedItem()
  .then(addToDB)

navigator.serviceWorker
  .register('sw.js')
  .then(() => console.info('Service worker registered!'))
