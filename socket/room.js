const ActionRecord = require('../utils/ActionRecord')
// ActionRecord.start();

let actionRecord = new ActionRecord();
actionRecord.start();

/**
 * Define socket method for room
 */

function roomSocket(io) {
  const nsp = io.of('/room');
  nsp.on('connection', function(socket){
    socket.on('create', function(room) {
      socket.join(room);
    });
    socket.on('quit', function(room) {
      socket.leave(room);
    })
    socket.on('play', (e) => {
      if (actionRecord.addRecord(1, 'play', e)) {
        socket.to(e.room).emit('play', e.timestamp);
      }
    })
    socket.on('pause', (e) => {
      if (actionRecord.addRecord(1, 'pause', e)) {
        socket.to(e.room).emit('pause', e.timestamp);
      }
    })
    socket.on('seeked', (e) => {
      if (actionRecord.addRecord(1, 'seek', e)) {
        let rooms = Object.keys(socket.rooms).filter(item => item!=socket.id);
        rooms.forEach(room => {
          socket.broadcast.to(room).emit('seek', e);
        });
      }
    })

  });
  // console.log('a user connected');
}

 module.exports = roomSocket