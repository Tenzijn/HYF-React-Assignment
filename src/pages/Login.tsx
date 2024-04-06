import { useEffect, useState, useContext } from 'react';
import {
  Button,
  Container,
  Flex,
  Input,
  useDisclosure,
  Box,
} from '@chakra-ui/react';
import AlertComponent from '../components/AlertComponent';
import { MessageContainer } from '../components/MessageContainer';
import { CopyRight } from '../components/CopyRight';
import '../styles/Login.css';
import axios from 'axios';
import { Loading } from '../components/Loading';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/context';
import { LoginInstruction } from '../components/LoginInstruction';
import Typing from '../components/Typing';

type alertContent = {
  title: string;
  description: string;
  status: string;
  color: string;
};

type response = {
  status: number;
  data: {
    token: string;
    name: string;
    userId: string;
  };
};

type error = {
  response: {
    status: number;
    data: {
      error: string;
    };
  };
};

const LoginHandler = async (
  username: string,
  password: string,
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setResponse: (response: response) => void,
  setIsError: (error: error) => void,
  setToken: (token: string) => void,
  setUserId: React.Dispatch<React.SetStateAction<string>>,
  setUsername: React.Dispatch<React.SetStateAction<string>>
) => {
  setIsLoading(true);
  await axios
    .post('https://messaging-api-hdnu.onrender.com/users/login', {
      name: username,
      password: password,
    })
    .then((response) => {
      setToken(response.data.token);
      setUserId(response.data.userId);
      setUsername(response.data.name);
      setIsLogin(true);
      setIsLoading(false);
      setResponse({
        status: response.status,
        data: {
          token: response.data.token,
          name: response.data.name,
          userId: response.data.userId,
        },
      });
    })
    .catch((error) => {
      setIsLoading(false);
      setIsError({
        response: {
          status: error.response.status,
          data: {
            error: error.response.data.error,
          },
        },
      });
    });
};

const SignUpHandler = async (
  username: string,
  password: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setIsError: (error: error) => void,
  setResponse: (response: response) => void
) => {
  setIsLoading(true);
  await axios
    .post('https://messaging-api-hdnu.onrender.com/users', {
      name: username,
      password: password,
    })
    .then((response) => {
      setIsLoading(false);
      setResponse({
        status: response.status,
        data: {
          token: response.data.token,
          name: response.data.name,
          userId: response.data.userId,
        },
      });
      return response;
    })
    .catch((error) => {
      setIsLoading(false);
      setIsError({
        response: {
          status: error.response.status,
          data: {
            error: error.response.data.error,
          },
        },
      });
      return error;
    });
};

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState({} as response);
  const [isError, setIsError] = useState({} as error);
  const [alertContent, setAlertContent] = useState({} as alertContent);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const { setUsers, token, setToken } = useContext(UserContext);

  const {
    onOpen,
    onClose,
    isOpen: isVisible,
  } = useDisclosure({
    defaultIsOpen: false,
  });

  useEffect(() => {
    (async () => {
      await axios
        .get('https://messaging-api-hdnu.onrender.com/users')
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          onOpen();
          setAlertContent({
            title: 'Error',
            description: `An error occurred. ${error.response.data.error}`,
            status: 'error',
            color: 'red',
          });
        });
    })();
  }, []);

  useEffect(() => {
    if (Object.keys(response).length > 0) {
      if (response.status === 200) {
        onOpen();
        setAlertContent({
          title: 'Login Successful',
          description: 'You have successfully logged in.',
          status: 'success',
          color: 'green',
        });
        setResponse({ status: 0, data: { token: '', name: '', userId: '' } });
      } else if (response.status === 201) {
        onOpen();
        setAlertContent({
          title: 'Sign Up Successful',
          description: 'You have successfully signed up.',
          status: 'success',
          color: 'green',
        });
        setResponse({ status: 0, data: { token: '', name: '', userId: '' } });
      }
    }

    // check if isError is not empty
    if (Object.keys(isError).length > 0) {
      if (isError.response.status === 400) {
        onOpen();
        setAlertContent({
          title: 'Error',
          description: `An error occurred. ${isError.response.data.error}`,
          status: 'error',
          color: 'red',
        });
        setIsError({
          response: {
            status: 0,
            data: {
              error: '',
            },
          },
        });
      }
    }

    if (token.length > 0 && userId.length > 0 && username.length > 0) {
      localStorage.setItem('token', token);
      localStorage.setItem(
        'user',
        JSON.stringify({ userId: userId, username: username })
      );
    }
  }, [response, isError, onOpen, token, userId, username]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token !== null && token.length > 0) {
      navigate('/');
    }
  }, [isLogin, navigate]);

  return (
    <div className='loginPage'>
      <Loading
        isLoading={isLoading}
        title='Processing ...'
        description='For the first time, this may take a few seconds (30s - 40s). Because the server is
        starting up. Thank you for your patience.'
      />
      {isVisible ? (
        <AlertComponent onClose={onClose} alertContent={alertContent} />
      ) : null}
      <Container centerContent color={'#f1f1f1'} maxW={'5xl'}>
        <Flex
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          w={'100%'}
          h={'100vh'}
        >
          <MessageContainer>
            <LoginInstruction />
            <Typing position='flex-end' />
          </MessageContainer>
          <Input
            placeholder='User Name'
            w={'100%'}
            maxW={'400px'}
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
            w={'100%'}
            maxW={'400px'}
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
            w={'100%'}
            maxW={'400px'}
            mt={'1rem'}
            colorScheme='blue'
            onClick={() => {
              if (username.length === 0) {
                onOpen();
                setAlertContent({
                  title: 'Error',
                  description: 'Enter a valid username',
                  status: 'error',
                  color: 'red',
                });
                return;
              }
              if (password.length < 8) {
                onOpen();
                setAlertContent({
                  title: 'Error',
                  description: 'Enter a valid password',
                  status: 'error',
                  color: 'red',
                });
                return;
              }
              LoginHandler(
                username,
                password,
                setIsLogin,
                setIsLoading,
                setResponse,
                setIsError,
                setToken,
                setUserId,
                setUsername
              );
            }}
          >
            Login
          </Button>
          <Button
            w={'100%'}
            maxW={'400px'}
            mt={'1rem'}
            colorScheme='green'
            onClick={() => {
              if (username.length === 0) {
                onOpen();
                setAlertContent({
                  title: 'Error',
                  description: 'Enter a valid username',
                  status: 'error',
                  color: 'red',
                });
                return;
              }
              if (password.length < 8) {
                onOpen();
                setAlertContent({
                  title: 'Error',
                  description: 'Enter a valid password',
                  status: 'error',
                  color: 'red',
                });
                return;
              }
              SignUpHandler(
                username,
                password,
                setIsLoading,
                setIsError,
                setResponse
              );
            }}
          >
            Sign Up
          </Button>
          <Box position={'absolute'} bottom={4}>
            <CopyRight />
          </Box>
        </Flex>
      </Container>
    </div>
  );
}

export { Login };
