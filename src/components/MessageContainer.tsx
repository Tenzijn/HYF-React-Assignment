import { Box } from '@chakra-ui/react';
import { LoginInstruction } from './LoginInstruction';
import Typing from './Typing';
function MessageContainer() {
  return (
    <Box
      bg={'#616162'}
      maxW={'400px'}
      maxH={'400px'}
      width={'100%'}
      height={'60%'}
      border={'2px solid #f1f1f1'}
      borderRadius={'10px'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'end'}
      position={'relative'}
      pb={'10px'}
    >
      <Box
        height={'20px'}
        width={'100%'}
        borderBottom={'2px solid #f1f1f1'}
        display={'flex'}
        alignItems={'center'}
        position={'absolute'}
        top={'0'}
        left={'0'}
      >
        <Box
          bg={'#F55151'}
          boxSize={'13px'}
          borderRadius={'50%'}
          m={'2px 5px 2px 10px'}
        ></Box>
        <Box
          bg={'#f1f1f1'}
          boxSize={'13px'}
          borderRadius={'50%'}
          m={'2px'}
        ></Box>
        <Box
          bg={'#4B8600'}
          boxSize={'13px'}
          borderRadius={'50%'}
          m={'2px'}
        ></Box>
      </Box>
      <LoginInstruction />
      <Typing position='flex-end' />
    </Box>
  );
}

export { MessageContainer };
