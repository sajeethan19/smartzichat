import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MessageComponent() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:3302/leap-node-twilio/messages/api');
        setMessages(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();

    const socket = new WebSocket('ws://localhost:3003');

    socket.onopen = () => {
      console.log('WebSocket Starting');
    };

    socket.onmessage = (event) => {
      console.log('Message received from WebSocket:', event.data);
      fetchMessages();
    };

    
    return () => {
      socket.close();
    };
  }); 

  return (
    <div>
      <h1>Messages</h1>
        {messages.map((message:any, index) => (
          <div key={index}>
            <p>Number: {message.number}</p>
            <div>Message: {message.messageList.map( (data:any) =>(
                <div key={data}>{data.type} : {data.text}</div>
                // {console.log(data.type)}
            )                  
            )}</div>
          </div>
        ))}
    </div>
  );
}

export default MessageComponent;
