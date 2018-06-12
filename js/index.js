import TodoService from './TodoService.js'

const form = document.querySelector('form')
const ul = document.querySelector('ul')

function addItemToHTML(item) {
  const li = document.createElement('li')
  li.textContent = item
  ul.appendChild(li)
}

function cleanInput(item) {
  item.value = ''
  item.focus()
}

function loadItems() {
  TodoService
    .getList()
    .then(items => items.forEach(addItemToHTML))
}
loadItems()

const onSubmit = (event) => {
  event.preventDefault()
  const item = event.target.item

  TodoService
    .addItem(item.value)
    .then(() => {
      addItemToHTML(item.value)
      cleanInput(item)
    })
}

form.addEventListener('submit', onSubmit)