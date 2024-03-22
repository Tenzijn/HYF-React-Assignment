import { Box, Text } from '@chakra-ui/react';
import '../styles/MessageBubble.css';

type MessageBubbleProps = {
  message: string;
  position: string;
  color: string;
};

function MessageBubble(props: MessageBubbleProps) {
  return (
    <Box width={'100%'} display={'flex'} justifyContent={`${props.position}`}>
      <Box
        borderRadius={'1.5rem'}
        bg={`${props.color}`}
        m={'0.2rem 0.5rem'}
        display={'block'}
        position={'relative'}
        width={'fit-content'}
        h={'auto'}
      >
        <Text p={'0.4rem'} m={'0.2rem'} textAlign={'left'} lineHeight={'1rem'}>
          {props.message}
        </Text>
      </Box>
    </Box>
  );
}

export default MessageBubble;
