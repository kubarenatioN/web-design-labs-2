const chatList = document.getElementById('messages-list')
const forms = document.querySelectorAll('form')
const inputs = document.querySelectorAll('.send-text')
const users = document.querySelectorAll('.send-user')
// const sendBtn = document.getElementById('send-message-btn')

forms.forEach((f, i) => {
    f.addEventListener('submit', (e) => {
        e.preventDefault()
        const user = users[i].value
        const text = inputs[i].value
        f.reset()
        sendMessage(user, text)
    })
})

function getChat() {
    return fetch('http://localhost:3000/chat', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

function sendMessage(sender, text) {
    const body = {
        sender,
        text,
    }
    fetch('http://localhost:3000/chat', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(res => res.json())
    .then(chat => setChat(chat))
}

function setChat(chat) {
    let html = ''
    chat.forEach(m => {
        html += `
        <div class='message'>
            <span class='sender'>${m.sender}</span>
            <p class='text'>${m.text}</p>
            <span class='time'>${new Date(m.time).toLocaleTimeString()}</span>
        </div>`
    })
    chatList.innerHTML = html
    chatList.scrollTop = chatList.scrollHeight
}

getChat()
    .then(res => res.json())
    .then(chat => setChat(chat))