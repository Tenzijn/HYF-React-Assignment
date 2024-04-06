import {
  Grid,
  GridItem,
  Box,
  Text,
  Stack,
  Avatar,
  AvatarBadge,
  Button,
} from '@chakra-ui/react';
import { Navigate, Outlet } from 'react-router-dom';
import { CopyRight } from './CopyRight';

function ProtectedRoutes() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const auth: { token: boolean } = { token: token ? true : false };
  return auth.token ? (
    <Grid
      templateAreas={`"header header"
                  "main main"
                  "footer footer"`}
      gridTemplateRows={'70px 8fr 1fr'}
      gridTemplateColumns={'2fr 8fr'}
      gap='1'
      color='white'
      fontWeight='bold'
    >
      <GridItem pl='2' bg='blackAlpha.800' area={'header'}>
        <Box
          display={'flex'}
          w={'100%'}
          h={'100%'}
          justifyContent={'end'}
          alignItems={'center'}
        >
          <Stack direction='row' spacing={4} m={'2rem'}>
            <Avatar name={user.username} boxSize={'2em'}>
              <AvatarBadge boxSize='1em' bg='green.500' />
            </Avatar>
          </Stack>
          <Button
            colorScheme='red'
            variant='solid'
            size={'sm'}
            mr={'2rem'}
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Logout
          </Button>
        </Box>
      </GridItem>
      <GridItem bg='blackAlpha.900' area={'main'}>
        <Box
          display={'flex'}
          w={'100%'}
          justifyContent={'center'}
          alignItems={'center'}
          borderBottom={'1px'}
          borderBottomColor={'gray.500'}
        >
          <Stack direction='row' spacing={0} m={'0.2rem'}>
            <Text fontSize={'sm'} color='green'>
              Online
            </Text>
          </Stack>
        </Box>
        <Outlet />
      </GridItem>
      <GridItem pl='2' bg='blackAlpha.900' area={'footer'}>
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
