const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())


const chat = []

app.get('/chat', (req, res) => {
    res.json(chat)
})

app.post('/chat', (req, res) => {
    const { sender, text } = req.body
    chat.push({
        time: Date.now(),
        text,
        sender,
    })
    res.json(chat)
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})