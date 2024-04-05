import { Button, Box } from '@chakra-ui/react';
import { BeatLoader } from 'react-spinners';

type TypingProps = {
  position: string;
};

export default function Typing(props: TypingProps) {
  return (
    <Box width={'100%'} display={'flex'} justifyContent={`${props.position}`}>
      <Button
        isLoading
        spinner={<BeatLoader size={8} color='white' />}
        borderRadius={'1.5rem'}
        m={'0.2rem 0.8rem'}
        h={'auto'}
      />
    </Box>
  );
}
