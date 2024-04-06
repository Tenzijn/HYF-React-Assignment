import { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Login } from './pages/Login';
import { Chat } from './pages/Chat';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoutes } from './components/ProtectedRoutes';
import { UserContext } from './context/context';

import './styles/App.css';

type UserContextType = {
  users: [] | null;
  setUsers: (user: [] | null) => void;
  token: string;
  setToken: (token: string) => void;
};

const App = () => {
  const [users, setUsers] = useState<UserContextType['users']>(null);
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem('token');
    if (tokenFromLocalStorage) {
      setToken(token);
    }
  }, []);

  const userContextValue = {
    users,
    setUsers,
    token,
    setToken,
  };

  return (
    <ChakraProvider>
      <UserContext.Provider value={userContextValue}>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route element={<ProtectedRoutes />}>
              <Route path='/' element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </ChakraProvider>
  );
};

export default App;
