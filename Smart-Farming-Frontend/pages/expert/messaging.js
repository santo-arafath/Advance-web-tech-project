// pages/messaging.js
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Layout from '../components/chatlayout';
import Title from '../components/title';
import { useRouter } from 'next/router';

const Messaging = () => {
  const [content, setContent] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [forceRerender, setForceRerender] = useState(false);

  const router = useRouter();
  const senderId = sessionStorage.getItem('id');
  const receiverId = router.query.receiverId || '';
  const messagingContainerRef = useRef(null);

  const sendMessage = async () => {
    try {
      await axios.post(`http://localhost:3000/${senderId}/contact/${receiverId}`, { content });
      setContent('');
      setError(null);
      getMessages();
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Error sending message. Please try again.');
    }
  };

  const getMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/${senderId}/contact/${receiverId}/messages`);
      setMessages(response.data.messages);
      setError(null);
      setForceRerender((prev) => !prev); // Trigger re-render
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Error fetching messages. Please try again.');
    }
  };

  useEffect(() => {
    if (!receiverId) {
      router.push('/expert/contact');
      return;
    }

    getMessages();
  }, [receiverId]);

  const reloadMessages = () => {
    getMessages();
  };

  useEffect(() => {
    // Scroll to the bottom when messages are updated
    const lastMessage = messagingContainerRef.current.lastChild;
    if (lastMessage) {
      lastMessage.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <>
      <Title page="Messaging" />
      <Layout>
        <div className="container mx-auto mt-8">
          <div
            ref={messagingContainerRef}
            className="border border-gray-200 p-4 rounded-md mb-4 h-[calc(100vh-200px)] overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">Messaging</h1>
              <button onClick={reloadMessages} className="text-blue-500 hover:underline focus:outline-none">
                Reload
              </button>
              <button
                onClick={() => router.push('/expert/contact')}
                className="text-blue-500 hover:underline focus:outline-none"
              >
                Contacts
              </button>
            </div>
            <div key={forceRerender}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`my-2 ${
                    message.senderId === senderId
                      ? 'flex justify-end items-center'
                      : 'flex justify-start items-center'
                  }`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-md ${
                      message.senderId === senderId ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-100 text-gray-800 mr-auto'
                    }`}
                  >
                    <p>{message.content}</p>
                    <small className="text-gray-500">
                      {message.senderId == senderId ? 'Sent' : 'Received'} -{' '}
                      {new Date(message.timestamp).toLocaleString()}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 py-2 px-3 border rounded-md mr-2 focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Send
            </button>
          </div>

          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </Layout>
    </>
  );
};

export default Messaging;