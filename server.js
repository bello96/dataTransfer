const express = require('express');
const app = express();
const http = require('http').Server(app);

// 检测是否在Vercel环境
const isVercel = process.env.VERCEL || process.env.NOW_REGION;

const io = require('socket.io')(http, {
  maxHttpBufferSize: 1e8, // 100MB
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  transports: ['polling'], // Vercel环境只使用polling
  allowEIO3: true,
  pingTimeout: 60000,
  pingInterval: 25000
});
const os = require('os');
const path = require('path');

// 获取本机IP地址
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

app.use(express.static('public'));

// 根路由处理
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 测试连接路由
app.get('/test', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// 存储房间信息
const rooms = new Map();

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);
  console.log('Transport:', socket.conn.transport.name);
  
  // 连接确认
  socket.emit('connected', { status: 'connected', id: socket.id });

  // 检查房间是否存在
  socket.on('check room', (room) => {
    console.log('checking room ', room);
    const roomExists = rooms.has(room);
    socket.emit('room check result', {
      room: room,
      exists: roomExists
    });
  });

  socket.on('create or join', (room) => {
    console.log('create or join to room ', room);
    
    if (!rooms.has(room)) {
      rooms.set(room, {
        users: [],
        createdAt: new Date(),
        nextUserNumber: 1
      });
    }
    
    const roomData = rooms.get(room);
    const existingUser = roomData.users.find(user => user.id === socket.id);
    
    if (!existingUser) {
      // 分配唯一的用户编号
      const userNumber = roomData.nextUserNumber++;
      const isFirstUser = roomData.users.length === 0;
      const userName = isFirstUser ? '房主' : `${userNumber}号`;
      
      const newUser = {
        id: socket.id,
        name: userName,
        number: userNumber,
        isHost: isFirstUser,
        joinedAt: new Date()
      };
      
      roomData.users.push(newUser);
      socket.join(room);
      
      console.log(`User ${userName} (${socket.id}) joined room ${room}`);
      
      // 通知用户加入成功
      socket.emit('joined', {
        room: room,
        userInfo: newUser,
        roomUsers: roomData.users
      });
      
      // 通知房间内其他用户有新用户加入
      socket.to(room).emit('user joined', {
        newUser: newUser,
        roomUsers: roomData.users
      });
      
      console.log(`User ${userName} joined room ${room}. Total users: ${roomData.users.length}`);
    }
  });

  // 文件传输 - 开始
  socket.on('file-start', (data) => {
    console.log(`File transfer started: ${data.fileName} from ${data.senderName}`);
    socket.to(data.room).emit('file-start', data);
  });

  // 文件传输 - 数据块
  socket.on('file-chunk', (data) => {
    socket.to(data.room).emit('file-chunk', data);
  });

  // 文件传输 - 结束
  socket.on('file-end', (data) => {
    console.log(`File transfer completed: ${data.fileName}`);
    socket.to(data.room).emit('file-end', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
    
    // 从所有房间中移除用户
    for (const [roomId, roomData] of rooms.entries()) {
      const userIndex = roomData.users.findIndex(user => user.id === socket.id);
      if (userIndex !== -1) {
        const removedUser = roomData.users.splice(userIndex, 1)[0];
        console.log(`User ${removedUser.name} left room ${roomId}`);
        
        // 如果离开的是房主且房间还有其他用户，需要重新分配房主
        if (removedUser.isHost && roomData.users.length > 0) {
          // 找到加入时间最早的用户作为新房主
          let newHost = roomData.users[0];
          for (let user of roomData.users) {
            if (user.joinedAt < newHost.joinedAt) {
              newHost = user;
            }
          }
          
          // 确保所有用户都不是房主
          roomData.users.forEach(user => {
            user.isHost = false;
            // 恢复原来的编号名称
            if (user.name === '房主') {
              user.name = `${user.number}号`;
            }
          });
          
          // 设置新房主
          newHost.isHost = true;
          newHost.name = '房主';
          
          console.log(`New host assigned: ${newHost.name} (${newHost.id}) in room ${roomId}`);
          
          // 通知所有用户房主变更
          io.to(roomId).emit('host changed', {
            newHost: newHost,
            roomUsers: roomData.users
          });
        }
        
        // 通知房间内其他用户
        socket.to(roomId).emit('user left', {
          leftUser: removedUser,
          roomUsers: roomData.users
        });
        
        // 如果房间为空，删除房间
        if (roomData.users.length === 0) {
          rooms.delete(roomId);
          console.log(`Room ${roomId} deleted`);
        }
        
        console.log(`User ${removedUser.name} left room ${roomId}`);
        break;
      }
    }
  });
});

const port = process.env.PORT || 9525;
const localIP = getLocalIP();

http.listen(port, '0.0.0.0', () => {
  console.log(`Server running on:`);
  console.log(`  Local:   http://localhost:${port}`);
  console.log(`  Network: http://${localIP}:${port}`);
});
