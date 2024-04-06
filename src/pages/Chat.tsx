import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/context';
import axios from 'axios';
import {
  Box,
  Stack,
  Text,
  Avatar,
  AvatarBadge,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';

const fetchMessages = async (
  config: {
    headers: {
      Authorization: string;
    };
  },
  setMessages: React.Dispatch<React.SetStateAction<never[]>>
) => {
  if (config.headers.Authorization === '')
    return console.log('Please login to view this page');
  try {
    const response = await axios.get(
      `https://messaging-api-hdnu.onrender.com/messages/`,
      config
    );
    setMessages(response.data);
    return;
  } catch (error) {
    console.log(error);
  }
};

function Chat() {
  const [messages, setMessages] = useState([]);
  const { users, setUsers, token, setToken } = useContext(UserContext);

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem('token');
    if (tokenFromLocalStorage) {
      setToken(tokenFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    (async () => {
      await axios
        .get('https://messaging-api-hdnu.onrender.com/users')
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);

  const config = {
    headers: {
      Authorization: '',
    },
  };

  if (!token) {
    return <Text>Please login to view this page</Text>;
  } else {
    config.headers.Authorization = `Bearer ${token}`;
    fetchMessages(config, setMessages);
  }
  return (
    <Tabs>
      <TabList w={'100%'} overflow={'scroll'}>
        {users && users.length > 0 ? (
          users.map((user: { _id: string; name: string }) => (
            <Tab key={user._id}>
              <Box
                key={user._id}
                display={'flex'}
                w={'100%'}
                p={'0rem'}
                justifyContent={'start'}
                alignItems={'center'}
                borderBottom={'1px'}
                borderBottomColor={'gray.700'}
                cursor={'pointer'}
              >
                <Stack
                  direction='row'
                  spacing={1}
                  m={'0.1rem'}
                  alignItems={'center'}
                >
                  <Avatar name={user.name} boxSize={'1.2em'}>
                    <AvatarBadge boxSize='0.6em' bg='green.500' />
                  </Avatar>
                  <Text fontSize={'lg'}>{user.name}</Text>
                </Stack>
              </Box>
            </Tab>
          ))
        ) : (
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
              <Text fontSize={'lg'}>No Users</Text>
            </Stack>
          </Box>
        )}
      </TabList>
      <TabPanels h={'50vh'}>
        {users && users.length > 0 ? (
          users.map((user: { _id: string; name: string }) => (
            <TabPanel key={user._id}>
              <Box
                display={'flex'}
                w={'100%'}
                h={'100%'}
                justifyContent={'start'}
                alignItems={'center'}
                borderBottom={'1px'}
                borderBottomColor={'gray.700'}
                cursor={'pointer'}
              >
                <Text>{user.name}</Text>
              </Box>
            </TabPanel>
          ))
        ) : (
          <TabPanel>
            <Text>No Users</Text>
          </TabPanel>
        )}
      </TabPanels>
    </Tabs>
  );
}

export { Chat };
