import TodoService from './TodoService.js'
import HtmlService from './HtmlService.js'

TodoService
  .getList()
  .then(items => items.forEach(HtmlService.addToHtmlList))

const addToDB = (item) => {
  TodoService
    .addItem(item)
    .then(() => HtmlService.addToHtmlList(item))
}

HtmlService
  .getInputedItem()
  .then(addToDB)

navigator.serviceWorker
  .register('sw.js')
  .then(() => console.info('Service worker registered!'))
