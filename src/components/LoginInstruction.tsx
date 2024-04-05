import { useState, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import { Box } from '@chakra-ui/react';

function LoginInstruction() {
  const [messageIndex, setMessageIndex] = useState(0);
  const messageContent = [
    {
      id: 1,
      position: 'flex-start',
      color: 'blue',
      message: 'Welcome to the chat app! Please enter your Username to login.',
    },
    {
      id: 2,
      position: 'flex-end',
      color: 'green',
      message: 'I am entering my Username now.',
    },
    {
      id: 3,
      position: 'flex-start',
      color: 'blue',
      message: 'Please enter your password.',
    },
    {
      id: 4,
      position: 'flex-end',
      color: 'green',
      message: 'I am entering my password now.',
    },
    {
      id: 5,
      position: 'flex-start',
      color: 'blue',
      message: 'If so you will be logged in.',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => prevIndex + 1);
    }, Math.floor(Math.random() * 2000) + 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      {messageContent.slice(0, messageIndex + 1).map((message) => (
        <MessageBubble
          key={message.id}
          position={message.position}
          color={message.color}
          message={message.message}
        />
      ))}
    </Box>
  );
}

export { LoginInstruction };
