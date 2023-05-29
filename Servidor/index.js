const http = require("http");
require('dotenv').config();

const server = http.createServer();

const io = require("socket.io")(server);

io.on ("connection",(socket)=>{

   socket.on("cdataSend", (data) => {
      console.log(data);
      socket.broadcast.emit("cdataSend", data);
   });
   
})

// server.listen(3000)
server.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto', process.env.PORT);
});
