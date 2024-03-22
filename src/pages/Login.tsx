import { Container, Flex } from '@chakra-ui/react';
import { MessageContainer } from '../components/MessageContainer';
import { LoginImage } from '../components/LoginImage';
import { TextInput } from '../components/TextInput';
import { CopyRight } from '../components/CopyRight';
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
          <LoginImage imgUrl='./chat.svg' />
          <MessageContainer />
          <TextInput />
          <CopyRight />
        </Flex>
      </Container>
    </div>
  );
}

export { Login };
