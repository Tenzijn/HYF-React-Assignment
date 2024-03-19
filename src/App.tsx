import { ChakraProvider } from '@chakra-ui/react';
import { Login } from './pages/Login';

import './styles/App.css';
function App() {
  return (
    <ChakraProvider>
      <Login />
    </ChakraProvider>
  );
}

export default App;
