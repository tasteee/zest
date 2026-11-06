const MESSAGES = [
  { id: 'a', from: 'Grace Hopper', subject: 'Review the release notes', body: 'Can you read through them before Friday? Mostly wording changes.' },
  { id: 'b', from: 'Alan Turing', subject: 'Standup moved', body: 'We’re meeting at 10:30 instead. Same room.' },
  { id: 'c', from: 'Katherine Johnson', subject: 'New numbers', body: 'The updated figures are in the shared sheet.' }
]

const list = document.querySelector('#messages')
const subject = document.querySelector('#subject')
const from = document.querySelector('#from')
const body = document.querySelector('#body')

const show = (message) => {
  subject.textContent = message.subject
  from.textContent = `From ${message.from}`
  body.textContent = message.body
}

for (const message of MESSAGES) {
  const row = document.createElement('z-list-row')
  row.innerHTML = `<div><z-text weight="600">${message.from}</z-text><z-text size="sm" color="muted" style="display: block">${message.subject}</z-text></div>`
  row.addEventListener('click', () => show(message))
  list.append(row)
}

show(MESSAGES[0])
