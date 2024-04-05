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
  //get token from local storage

  const token = localStorage.getItem('token');

  // get user info from local storage and parse it
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const auth: { token: boolean } = { token: token ? true : false };
  return auth.token ? (
    <Grid
      templateAreas={`"header header"
                  "nav main"
                  "footer footer"`}
      gridTemplateRows={'50px 1fr 30px'}
      gridTemplateColumns={'2fr 8fr'}
      h='100dvh'
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
      <GridItem bg='blackAlpha.900' area={'nav'}>
        <Box
          display={'flex'}
          w={'100%'}
          justifyContent={'start'}
          alignItems={'center'}
          borderBottom={'1px'}
          borderBottomColor={'gray.500'}
        >
          <Stack direction='row' spacing={4} m={'1rem'}>
            <Text fontSize={'lg'}>Welcome {user.username}</Text>
          </Stack>
        </Box>
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

        <Box
          display={'flex'}
          w={'100%'}
          justifyContent={'start'}
          alignItems={'center'}
          borderBottom={'1px'}
          borderBottomColor={'gray.700'}
          cursor={'pointer'}
        >
          <Stack direction='row' spacing={4} m={'1rem'} alignItems={'center'}>
            <Avatar name={user.username} boxSize={'2em'}>
              <AvatarBadge boxSize='1em' bg='green.500' />
            </Avatar>
            <Text fontSize={'lg'}>Tenzin</Text>
          </Stack>
        </Box>

        <Box
          display={'flex'}
          w={'100%'}
          justifyContent={'center'}
          alignItems={'center'}
          borderBottom={'1px'}
          borderTop={'1px'}
          borderBottomColor={'gray.500'}
          borderTopColor={'gray.300'}
        >
          <Stack direction='row' spacing={0} m={'0.2rem'}>
            <Text fontSize={'sm'} color='gray.400'>
              Offline
            </Text>
          </Stack>
        </Box>

        <Box
          display={'flex'}
          w={'100%'}
          justifyContent={'start'}
          alignItems={'center'}
          borderBottom={'1px'}
          borderBottomColor={'gray.300'}
          cursor={'pointer'}
        >
          <Stack direction='row' spacing={4} m={'1rem'} alignItems={'center'}>
            <Avatar name={user.username} boxSize={'2em'}>
              <AvatarBadge boxSize='1em' bg='gray.500' />
            </Avatar>
            <Text fontSize={'lg'}>Karma</Text>
          </Stack>
        </Box>
      </GridItem>
      <GridItem pl='2' bg='blackAlpha.500' area={'main'} h={'100%'}>
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
