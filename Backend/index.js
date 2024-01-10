const io = require("socket.io")(8000, {
    cors: {
      origin: "*",
    },
  });
  
  

const users={}

io.on("connection",socket=>{
    console.log("client connected")
  socket.on("new-user-joined",name=>{
    console.log(name)
    users[socket.id]=name
    socket.broadcast.emit("user-joined",name)
  })
  socket.on("send",(msg)=>{
    socket.broadcast.emit("receive",{msg,name:users[socket.id]})
  })

  socket.on("disconnect",msg=>{
    socket.broadcast.emit("left",users[socket.id])
    delete users[socket.id]
  })
})