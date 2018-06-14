import TodoService from './TodoService.js'
import HtmlService from './HtmlService.js'

const form = document.querySelector('form')

function cleanInput(input) {
  input.value = ''
  input.focus()
}

TodoService
  .getList()
  .then(items => items.forEach(HtmlService.addToHtmlList))

const onSubmit = (event) => {
  event.preventDefault()

  const item = event.target.item
  TodoService
    .addItem(item.value)
    .then(() => {
      HtmlService.addToHtmlList(item.value)
      cleanInput(item)
    })
}

form.addEventListener('submit', onSubmit)