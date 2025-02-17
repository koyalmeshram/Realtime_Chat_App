import express from 'express'; 
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://chat-app-frontend-iswaxy7q9-koyal-meshrams-projects.vercel.app", 
    methods: ["GET", "PUT"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User ID :- ${socket.id} joined room : ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log("send message data", data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected..", socket.id);
  });
});

app.use(cors({
  origin: "https://chat-app-frontend-iswaxy7q9-koyal-meshrams-projects.vercel.app",  // Vercel frontend URL
  methods: ["GET", "POST"]
}));

app.get("/", (req, res) => {
  res.send("Backend server is running");
});

const PORT = process.env.PORT || 1000;  
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
