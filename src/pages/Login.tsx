import { useEffect, useState } from 'react';
import { Button, Container, Flex, Input } from '@chakra-ui/react';
import { MessageContainer } from '../components/MessageContainer';
import { CopyRight } from '../components/CopyRight';
import '../styles/Login.css';
import axios from 'axios';

const LoginHandler = async (
  username: string,
  password: string,
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
) => {
  await axios
    .post('https://messaging-api-hdnu.onrender.com/users/login', {
      name: username,
      password: password,
    })
    .then((response) => {
      console.log(response);
      response.status === 200 ? setIsLogin(true) : console.log('Login failed');
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      console.log('loading');
    }
  }, [isLoading]);

  if (isLogin) {
    return <div>Logged in</div>;
  }

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
          <MessageContainer />
          <Input
            placeholder='User Name'
            w={'400px'}
            m={'1rem'}
            onFocus={(e) => {
              if (e.target.value === 'Enter a valid username') {
                e.target.value = '';
                e.target.classList.remove('error');
              }
            }}
            onBlur={(e) => {
              const isValidUsername = () => {
                return e.target.value.length > 0;
              };
              if (isValidUsername()) {
                setUsername(e.target.value);
                e.target.classList.remove('error');
              } else {
                e.target.value = 'Enter a valid username';
                e.target.classList.add('error');
              }
            }}
          />
          <Input
            placeholder='Password'
            type='password'
            w={'400px'}
            onFocus={(e) => {
              if (e.target.value === 'Enter a valid password') {
                e.target.value = '';
                e.target.classList.remove('error');
              }
            }}
            onBlur={(e) => {
              const isValidPassword = () => {
                return e.target.value.length > 8;
              };
              if (isValidPassword()) {
                setPassword(e.target.value);
                e.target.classList.remove('error');
              } else {
                e.target.value = 'Enter a valid password';
                e.target.classList.add('error');
              }
            }}
          />

          <Button
            w={'400px'}
            m={'1rem'}
            colorScheme='blue'
            onClick={() => {
              LoginHandler(username, password, setIsLogin);
              setIsLoading(true);
            }}
          >
            Login
          </Button>

          <CopyRight />
        </Flex>
      </Container>
    </div>
  );
}

export { Login };
