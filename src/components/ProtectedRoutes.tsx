import { Grid, GridItem, Box, Text } from '@chakra-ui/react';
import { Navigate, Outlet } from 'react-router-dom';
import { CopyRight } from './CopyRight';

function ProtectedRoutes() {
  //get token from local storage

  const token = localStorage.getItem('token');

  // get user info from local storage and parse it
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const auth: { token: boolean } = { token: token ? true : false };
  return auth.token ? (
    <Grid
      templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
      gridTemplateRows={'50px 1fr 30px'}
      gridTemplateColumns={'150px 1fr'}
      h='100dvh'
      gap='1'
      color='blackAlpha.700'
      fontWeight='bold'
    >
      <GridItem pl='2' bg='orange.300' area={'header'}>
        <Box>
          <Text>{user.username}</Text>
        </Box>
      </GridItem>
      <GridItem pl='2' bg='pink.300' area={'nav'}>
        Nav
      </GridItem>
      <GridItem pl='2' bg='green.300' area={'main'} h={'100%'}>
        <Outlet />
      </GridItem>
      <GridItem pl='2' bg='blue.300' area={'footer'}>
        <Box
          display={'flex'}
          w={'100%'}
          alignContent={'center'}
          justifyContent={'center'}
        >
          <CopyRight />
        </Box>
      </GridItem>
    </Grid>
  ) : (
    <Navigate to='/login' />
  );
}

export { ProtectedRoutes };
