var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
const { sequelize } = require('./database/db')
var app = express()

var port = process.env.PORT || 5000

const server = require("http").createServer(app);
//socket.io begins
//The require('socket.io')(server) creates a new socket.io instance attached to the http server.
const io = require("socket.io").listen(server);

require("./socket/refresh")(io);

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(express.json())



app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/event'))
app.use(require('./routes/like'))
app.use(require('./routes/chat'))
app.use(require('./routes/searchuser'))
app.use(require('./routes/complaint'))
app.use(require('./routes/notice'))


require('./models/messages')
require('./models/chatroom')
require('./models/user')
require('./models/post')
require('./models/event')
require('./models/like')
require('./models/complaint')
require('./models/notice')

server.listen(port, function() {
  console.log('Server is running on port: ' + port)
})

