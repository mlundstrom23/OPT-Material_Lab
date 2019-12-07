const express = require("express")
const app = express()
const port = 1337


// used for sendFile and anything in the client folder will also be delivered
app.use(express.static('client'))

app.get('/', (request, response) => {
    response.sendFile('./client/index.html')
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})