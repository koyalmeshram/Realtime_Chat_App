import React, { useState } from 'react'
import io from 'socket.io-client'
import Chat from './Chat'
import music from './mixkit-tile-game-reveal-960.wav'

const socket = io.connect("https://realtime-chat-app-5mlq.onrender.com")


const App = () => {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false)

  const notification = new Audio(music)

const joinChat = () =>{
  if(username !== "" && room !==""){
    socket.emit("join_room",room);
    setShowChat(true)
    notification.play();
  }
}
  return (
    <>
    {
      !showChat && (<div className="join_room">
        <h1>Join Chat</h1>
        <input type="text" placeholder='Enter your name' onChange={(e)=>setUsername(e.target.value)}/>
        <input type="text"placeholder='Enter chat room' onChange={(e)=>setRoom(e.target.value)}/>
        <button onClick={joinChat}>Join</button>
      </div>)
    }

    {
      showChat && 
      (
        <Chat socket={socket} username={username} room={room} />

      )
    }
      
    </>
  )
}

export default App
