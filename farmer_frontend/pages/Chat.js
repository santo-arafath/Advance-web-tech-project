// components/Chat.js
import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000"); // Replace with your backend URL

function Chat({ currentUsername, otherUsername }) {
  // Pass current and other usernames as props
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      console.log("Received message:", message);
      setMessages((prevMessages) => [...prevMessages, { ...message }]);
    });

    // Join the private room when component mounts
    socket.emit("joinRoom", getRoomName(currentUsername, otherUsername));

    return () => {
      // Leave the private room when component unmounts
      socket.emit("leaveRoom", getRoomName(currentUsername, otherUsername));
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        sender: currentUsername,
        text: message,
        room: getRoomName(currentUsername, otherUsername),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      socket.emit("message", newMessage);
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="message-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.sender === currentUsername ? "sent" : "received"
            }`}
          >
            <div className="message-content">
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <style jsx>{`
        .chat-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          justify-content: space-between;
        }

        .message-container {
          flex: 1;
          overflow-y: scroll;
          padding: 20px;
        }

        .message {
          display: flex;
          margin-bottom: 10px;
        }

        .received {
          justify-content: flex-start;
        }

        .sent {
          justify-content: flex-end;
        }

        .message-content {
          padding: 8px 12px;
          background-color: #f2f2f2;
          border-radius: 8px;
        }

        .input-container {
          display: flex;
          align-items: center;
          padding: 10px;
          background-color: #f2f2f2;
          border-top: 1px solid #ddd;
        }

        input {
          flex: 1;
          padding: 8px;
          border: none;
          border-radius: 4px;
        }

        button {
          padding: 8px 16px;
          background-color: #007bff;
          border: none;
          border-radius: 4px;
          color: white;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

// Function to generate a unique room name for the conversation
function getRoomName(user1, user2) {
  return [user1, user2].sort().join("-");
}

export default Chat;
