import { Button, Box } from '@chakra-ui/react';
import { BeatLoader } from 'react-spinners';

type TypingProps = {
  position: string;
  color: string;
};

export default function Typing(props: TypingProps) {
  return (
    <Box width={'100%'} display={'flex'} justifyContent={`${props.position}`}>
      <Button
        isLoading
        colorScheme={`${props.color}`}
        spinner={<BeatLoader size={8} color='white' />}
        borderRadius={'1.5rem'}
        bg={`${props.color}`}
        m={'0.2rem 0.8rem'}
        h={'auto'}
      />
    </Box>
  );
}
