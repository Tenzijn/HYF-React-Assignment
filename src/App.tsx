import { ChakraProvider } from '@chakra-ui/react';
import { Login } from './pages/Login';
import { Chat } from './pages/Chat';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoutes } from './components/ProtectedRoutes';

import './styles/App.css';

const App = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/' element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
