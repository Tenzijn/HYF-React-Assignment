import { Box, Container, Flex, Image, Input, Text } from '@chakra-ui/react';

import MessageBubble from '../components/MessageBubble';

import '../styles/Login.css';
function Login() {
  return (
    <div className='loginPage'>
      <Container centerContent color={'#f1f1f1'} maxW={'5xl'}>
        <Flex
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          w={'100%'}
          h={'100vh'}
        >
          <Box>
            <Image
              src='../chat.svg'
              objectFit={'contain'}
              boxSize={'400px'}
              alt='Chat app home Image'
            />
          </Box>
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
            <Box>
              <MessageBubble />
            </Box>
          </Box>
          <Box mt={'8px'} maxW={'400px'} w={'100%}'}>
            <Input
              color={'black'}
              bg={'#f1f1f1'}
              placeholder='Type here ...'
              size='lg'
              width={'100%'}
              height={'50px'}
              borderRadius={'10px'}
              border={'2px solid #f1f1f1'}
              mb={'20px'}
              _focus={{
                borderColor: '#F55151',
              }}
            />
          </Box>
          <Box position={'absolute'} bottom={'30px'}>
            <Text fontSize={'sm'}>
              {' '}
              Tenzin.Tibet.Dev &copy; 2024 | HYF React Project
            </Text>
          </Box>
        </Flex>
      </Container>
    </div>
  );
}

export { Login };
