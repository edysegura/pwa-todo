const form = document.querySelector('form')
const ul = document.querySelector('ul')
const className = 'done'

let itemClickEmitter = () => {}

export default class HtmlService {
  static createItem(li) {
    return {
      id: +li.getAttribute('data-item-id'),
      done: li.classList.contains(className),
      description: li.textContent
    }
  }

  static toggleDone(event) {
    const li = event.target
    li.classList.toggle(className)
    itemClickEmitter(HtmlService.createItem(li))
  }

  static addToHtmlList(item) {
    const li = document.createElement('li')

    li.setAttribute('data-item-id', item.id)
    li.textContent = item.description
    li.addEventListener('click', HtmlService.toggleDone)

    if (item.done) {
      li.classList.add('done')
    }

    ul.appendChild(li)
  }

  static cleanInput(input) {
    input.value = ''
    input.focus()
  }

  static getClickedItem() {
    // why I'm not using a promise here?
    // https://stackoverflow.com/questions/33449469/promise-is-only-firing-once
    return {
      then: callback => this.bindClickedItem(callback)
    }
  }

  static bindClickedItem(callback) {
    itemClickEmitter = callback
  }

  static getInputedItem() {
    // why I'm not using a promise here?
    // https://stackoverflow.com/questions/33449469/promise-is-only-firing-once
    return {
      then: callback => this.bindSubmittingAction(callback)
    }
  }

  static bindSubmittingAction(callback) {
    const onSubmit = event => {
      event.preventDefault()
      const input = event.target.item
      callback(input.value)
      this.cleanInput(input)
    }
    form.addEventListener('submit', onSubmit)
  }
}
