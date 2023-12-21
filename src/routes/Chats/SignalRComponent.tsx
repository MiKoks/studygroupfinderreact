import React, { useEffect, useState, useCallback } from 'react';
import SignalRService from '../../services/SignalRService';
import "./signalR.css";

const SignalRComponent: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string }[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const signalRService = SignalRService.getInstance();

  const onNewMessage = useCallback((newMessage: string) => {
    setMessages(prevMessages => [...prevMessages, { text: newMessage }]);
  }, []);

  useEffect(() => {
    signalRService.startConnection().then(() => {
      signalRService.onReceiveMessage(onNewMessage);
    });

    return () => {
      signalRService.stopConnection();
    };
  }, [onNewMessage]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(event.target.value);
  };

  const handleSendMessage = () => {
    signalRService.sendMessage(inputMessage);
    //setMessages(prevMessages => [...prevMessages, { text: inputMessage, isCurrentUser: true }]);
    setInputMessage('');
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className='mainBox'>
      <div className="chatbox">
        {messages.map((message, index) => (
          <div key={index} className={`messagebubble`}>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputMessage}
        onChange={handleInputChange}
        placeholder="Type a message"
        onKeyDown={handleKeyPress}
        className='messageInput'
      />
      <button onClick={handleSendMessage} className='sendMessage'>Send Message</button>
    </div>
  );
};

export default SignalRComponent;
