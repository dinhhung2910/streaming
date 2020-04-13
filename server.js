const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express();
const connectDB = require('./config/db');

var server  = require('http').createServer(app);
var io = require('socket.io').listen(server);

// Connect database
connectDB();

// Init middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({extended: false}));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'))
})

// Define Routes
app.use('/api/movies', require('./routes/api/movies'));

app.get('/index.html', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/streaming/**', function(req, res) {
  // fs.readFile()
  res.sendFile(path.join(__dirname + '/streaming.html'))
})

app.get('/video', function(req, res) {
  const path = 'assets/sample.mp4'
  const stat = fs.statSync(path)
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
    const file = fs.createReadStream(path, {start, end})
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

server.listen(3000, function () {
  console.log('Listening on port 3000!')
})

let timestamp = {};

function initTimestamp() {
  timestamp.play = new Set();
  timestamp.pause = new Set();
  timestamp.seek = new Set();
};
initTimestamp();

setInterval(() => {
  // console.info('reseting time log...');
  initTimestamp();
}, 2000);

io.on('connection', function(socket){
  // console.log('a user connected');
  socket.on('play', (e) => {
    if (!timestamp.play.has(e)) {
      console.log('play', e);
      socket.broadcast.emit('play', e);
      timestamp.play.add(e);
    }
  })
  socket.on('pause', (e) => {
    if (!timestamp.pause.has(e)) {
      console.log('pause', e);
      socket.broadcast.emit('pause', e);
      timestamp.pause.add(e);
    }
  })
  socket.on('seeked', (e) => {
    if (!timestamp.seek.has(e)) {
      console.log('seeked', e);
      socket.broadcast.emit('seeked', e);
      timestamp.seek.add(e);
    }
  })
});
