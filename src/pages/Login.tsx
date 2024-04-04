import { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Flex,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import AlertComponent from '../components/AlertComponent';
import { MessageContainer } from '../components/MessageContainer';
import { CopyRight } from '../components/CopyRight';
import '../styles/Login.css';
import axios from 'axios';
import { Loading } from '../components/Loading';

const LoginHandler = async (
  username: string,
  password: string,
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setResponse: React.Dispatch<React.SetStateAction<{}>>,
  setIsError: React.Dispatch<React.SetStateAction<{}>>
) => {
  setIsLoading(true);
  await axios
    .post('https://messaging-api-hdnu.onrender.com/users/login', {
      name: username,
      password: password,
    })
    .then((response) => {
      setIsLogin(true);
      setIsLoading(false);
      setResponse(response);
    })
    .catch((error) => {
      console.log(error);
      setIsLoading(false);
      setIsError(error);
    });
};

const SignUpHandler = async (
  username: string,
  password: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setResponse: React.Dispatch<React.SetStateAction<{}>>,
  setIsError: React.Dispatch<React.SetStateAction<{}>>
) => {
  setIsLoading(true);
  await axios
    .post('https://messaging-api-hdnu.onrender.com/users', {
      name: username,
      password: password,
    })
    .then((response) => {
      console.log(response);
      setIsLoading(false);
      setResponse(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      setIsLoading(false);
      setIsError(error);
      return error;
    });
};

type alertContent = {
  title: string;
  description: string;
  status: string;
  color: string;
};

type response = {
  status: number;
};

type error = {
  response: {
    status: number;
  };
  message: string;
};

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState({} as response);
  const [isError, setIsError] = useState({} as error);
  const [alertContent, setAlertContent] = useState({} as alertContent);

  useEffect(() => {
    console.log('response', response);
    console.log('isError', isError);

    // check if response is not empty
    if (Object.keys(response).length > 0) {
      if (response.status === 200) {
        onOpen();
        setAlertContent({
          title: 'Login Successful',
          description: 'You have successfully logged in.',
          status: 'success',
          color: 'green',
        });
        setResponse({});
      } else if (response.status === 201) {
        onOpen();
        setAlertContent({
          title: 'Sign Up Successful',
          description: 'You have successfully signed up.',
          status: 'success',
          color: 'green',
        });
        setResponse({});
      }
    }

    // check if isError is not empty
    if (Object.keys(isError).length > 0) {
      if (isError.response.status === 400) {
        onOpen();
        setAlertContent({
          title: 'Error',
          description: `An error occurred. ${isError.message}`,
          status: 'error',
          color: 'red',
        });
        setIsError({});
      }
    }
  }, [response, isError]);

  const {
    onOpen,
    onClose,
    isOpen: isVisible,
  } = useDisclosure({
    defaultIsOpen: false,
  });

  if (isLogin) {
    console.log('logged in');
    return <div>Logged in</div>;
  }

  return (
    <div className='loginPage'>
      <Loading isLoading={isLoading} />
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
            mt={'1rem'}
            colorScheme='blue'
            onClick={() => {
              LoginHandler(
                username,
                password,
                setIsLogin,
                setIsLoading,
                setResponse,
                setIsError
              );
            }}
          >
            Login
          </Button>
          <Button
            w={'400px'}
            mt={'1rem'}
            colorScheme='green'
            onClick={() => {
              SignUpHandler(
                username,
                password,
                setIsLoading,
                setResponse,
                setIsError
              );
            }}
          >
            Sign Up
          </Button>

          <CopyRight />
        </Flex>
      </Container>
    </div>
  );
}

export { Login };
