const form = document.querySelector('form')
const ul = document.querySelector('ul')

export default class HtmlService {
  static init() {
    this.setSubmitionAction()
  }

  static addToHtmlList(item) {
    const li = document.createElement('li')
    li.textContent = item
    ul.appendChild(li)
  }

  static cleanInput(input) {
    input.value = ''
    input.focus()
  }

  static setSubmitionAction() {
    const onSubmit = event => {
      event.preventDefault()
      const item = event.target.item

      TodoService.addItem(item.value).then(() => {
        addItemToHTML(item.value)
        cleanInput(item)
      })
    }

    form.addEventListener('submit', onSubmit)
  }
}
