const express = require('express')
const fs = require('fs')
const path = require('path')
var http = require('http');

// Read config from .env file
require('dotenv').config()

const app = express();
const connectDB = require('./config/db');

var server  = http.createServer(app);

// Read config from .env file
require('dotenv').config()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const roomSocket = require('./socket/room')(io);

// Connect database
connectDB();

// Init middleware
app.use(express.static(path.join(__dirname, 'client-old/dist')));
app.use(express.json({extended: false}));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index-text.html'))
})

// Define Routes
app.use('/api/movies', require('./routes/api/movies'));

app.get('/index.html', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/streaming/**', function(req, res) {
  // fs.readFile()
  res.sendFile(path.join(__dirname + '/client-old/dist/index.html'))
})

/**
 * @url   GET /video/:file
 */
app.get('/video/:filename', function(req, res) {
  const p = path.join(__dirname, 'assets/' + req.params.filename);
  const stat = fs.statSync(p)
  const fileSize = stat.size
  const range = req.headers.range

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize-1

    if(start >= fileSize) {
      res.status(416).send('Requested range not satisfiable\n'+start+' >= '+fileSize);
      return
    }
    
    const chunksize = (end-start)+1
    const file = fs.createReadStream(p, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }

    res.writeHead(206, head)
    file.pipe(res)
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
})

app.get('/subtitles/:filename', function(req, res) {
  res.sendFile(path.join(__dirname, '/cdn/public/subtitles/' + req.params.filename));
});

server.listen(process.env.APP_PORT, function () {
  console.log(`Listening on port ${process.env.APP_PORT}!`)
})

io.on('connection', function(socket){
  
});
