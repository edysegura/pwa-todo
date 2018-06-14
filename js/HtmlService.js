const form = document.querySelector('form')
const ul = document.querySelector('ul')

export default class HtmlService {
  static addToHtmlList(item) {
    const li = document.createElement('li')
    li.textContent = item
    ul.appendChild(li)
  }

  static cleanInput(input) {
    input.value = ''
    input.focus()
  }

  static getInputedItem() {
    // why I'm not using a promise here?
    // https://stackoverflow.com/questions/33449469/promise-is-only-firing-once
    return {
      then: (callback) => this.bindSubmittingAction(callback)
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
