import React, { useState, useRef } from 'react';
import axios from 'axios';

const ChatBot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const res = await axios.post('http://localhost:4000/api/chat', {
        message: input,
      });

      const botReply = res.data?.reply || "Sorry, I didn't understand that.";
      setMessages([...newMessages, { sender: 'bot', text: botReply }]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { sender: 'bot', text: 'Error: Unable to get response from AI.' },
      ]);
    }
  };

  const handleMouseDown = (e) => {
    setDragging(true);
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const handleMouseUp = () => setDragging(false);

  return (
    <div
      className="fixed z-50"
      style={{ left: position.x, top: position.y }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="bg-white w-80 h-96 rounded-xl shadow-2xl flex flex-col border border-gray-300">
        <div
          className="bg-blue-600 text-white p-3 rounded-t-xl flex justify-between items-center cursor-move"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          <span>Campus AI Assistant</span>
          <button
            onClick={onClose}
            className="text-white font-bold"
          >
            ×
          </button>
        </div>
        <div className="flex-1 p-2 overflow-y-auto space-y-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-md max-w-[80%] ${
                msg.sender === 'bot' ? 'bg-gray-100 self-start' : 'bg-blue-100 self-end'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="p-2 border-t flex gap-2">
          <input
            className="flex-1 px-2 py-1 border rounded"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask something..."
          />
          <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
