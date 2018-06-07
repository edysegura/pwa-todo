const form = document.querySelector('form')
const ul = document.querySelector('ul')

function addItem(item) {
  const li = document.createElement('li')
  li.textContent = item
  ul.appendChild(li)
}

const onSubmit = (event) => {
  event.preventDefault()
  const item = event.target.item
  addItem(item.value)
  item.value = ''
  item.focus()
}

form.addEventListener('submit', onSubmit)