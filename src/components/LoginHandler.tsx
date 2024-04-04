import MessageBubble from './MessageBubble';
import { Box } from '@chakra-ui/react';
function LoginHandler() {
  return (
    <Box>
      <MessageBubble
        position='flex-start'
        color='blue'
        message='Your User name'
      />
      <MessageBubble
        position='flex-end'
        color='green'
        message='tenzin@gmail.com'
      />
    </Box>
  );
}

export { LoginHandler };
