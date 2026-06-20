
import app from "./src/app.js";
import {createServer} from 'http'
import {Server} from 'socket.io'

const httpServer = createServer(app);
const io = new Server(httpServer,{});

io.on("connection",(socket)=>{
    console.log("first connection");

    socket.on("message",(msg)=>{
        console.log("user fired message event");
        console.log(msg)
        io.emit("abc",msg)
    })
})

httpServer.listen(3000,()=>{
    console.log("server is running at port 3000")
})