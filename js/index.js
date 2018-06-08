import TodoService from './TodoService.js'

const form = document.querySelector('form')
const ul = document.querySelector('ul')

function addItemToHTML(item) {
  const li = document.createElement('li')
  li.textContent = item
  ul.appendChild(li)
}

const onSubmit = (event) => {
  event.preventDefault()
  const item = event.target.item

  TodoService
    .addItem(item.value)
    .then(() => {
      addItemToHTML(item.value)
      item.value = ''
      item.focus()
    })
}

form.addEventListener('submit', onSubmit)