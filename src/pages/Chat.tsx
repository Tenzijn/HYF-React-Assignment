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
  Divider,
  Textarea,
  Button,
} from '@chakra-ui/react';
import MessageBubble from '../components/MessageBubble';

const fetchMessages = async (
  config: {
    headers: {
      Authorization: string;
    };
  },
  setMessages: React.Dispatch<React.SetStateAction<never[]>>
) => {
  try {
    const response = await axios.get(
      `https://messaging-api-hdnu.onrender.com/messages/`,
      config
    );
    setMessages(response.data);
  } catch (error) {
    console.log(error); // handle error
  }
};

function Chat() {
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState({
    _id: '',
    name: '',
  });
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { users, setUsers, token, setToken } = useContext(UserContext);
  const logInUser = JSON.parse(localStorage.getItem('user') || '{}');
  const config = {
    headers: {
      Authorization: '',
    },
  };

  useEffect(() => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      fetchMessages(config, setMessages);
    }
  }, [token]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          'https://messaging-api-hdnu.onrender.com/users'
        );
        const filteredUsers = response.data.filter(
          (user: { _id: string }) => user._id !== logInUser.userId
        );
        setUsers(filteredUsers);
        setSelectedUser(filteredUsers[0]);
      } catch (error) {
        console.log(error); // handle error
      }
    })();
  }, []);

  useEffect(() => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      fetchMessages(config, setMessages);
    } else {
      const tokenFromLocalStorage = localStorage.getItem('token');
      if (tokenFromLocalStorage) {
        setToken(tokenFromLocalStorage);
        config.headers.Authorization = `Bearer ${tokenFromLocalStorage}`;
        fetchMessages(config, setMessages);
      }
    }
  }, [selectedUser, token]);

  useEffect(() => {
    if (selectedUser && messages && messages.length > 0) {
      setSelectedMessages(
        messages.filter(
          (message: { receiverID: string; senderID: string }) =>
            (message.senderID === logInUser.userId &&
              message.receiverID === selectedUser._id) ||
            (message.senderID === selectedUser._id &&
              message.receiverID === logInUser.userId)
        )
      );
    }
  }, [messages, selectedUser, logInUser.userId]);

  return (
    <Tabs>
      <TabList w={'100%'} overflow={'scroll'}>
        {users && users.length > 0 ? (
          users.map((user: { _id: string; name: string }) => (
            <Tab
              key={user._id}
              onClick={() => {
                setSelectedUser(user);
              }}
            >
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
          <Tab>
            <Text>No Users</Text>
          </Tab>
        )}
      </TabList>
      <TabPanels height={'70vh'}>
        {users && users.length > 0 ? (
          users.map((user: { _id: string; name: string }) => (
            <TabPanel key={user._id} height={'100%'}>
              <Box
                display={'flex'}
                flexDirection={'column'}
                w={'100%'}
                h={'100%'}
                justifyContent={'end'}
                borderBottom={'1px'}
                borderBottomColor={'gray.700'}
                cursor={'pointer'}
              >
                <Box
                  overflow={'scroll'}
                  display={'flex'}
                  flexDirection={'column-reverse'}
                >
                  <Box>
                    {selectedMessages.map(
                      (message: {
                        message: string;
                        senderID: string;
                        _id: string;
                      }) => (
                        <Stack
                          key={message._id}
                          direction='row'
                          spacing={1}
                          m={'0.1rem'}
                          alignItems={'center'}
                        >
                          <MessageBubble
                            message={message.message}
                            position={
                              message.senderID === logInUser.userId
                                ? 'flex-end'
                                : 'flex-start'
                            }
                            color={
                              message.senderID === logInUser.userId
                                ? 'green.500'
                                : 'blue.500'
                            }
                          />
                        </Stack>
                      )
                    )}
                  </Box>
                </Box>
                <Divider />
                <Box
                  display={'flex'}
                  w={'100%'}
                  alignContent={'center'}
                  justifyContent={'center'}
                  pt={'1rem'}
                >
                  <Textarea
                    value={newMessage}
                    placeholder='Type your message here'
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                    }}
                  />
                  <Button
                    colorScheme='blue'
                    variant='solid'
                    size={'lg'}
                    alignSelf={'center'}
                    m={'0.5rem'}
                    onClick={async () => {
                      if (config.headers.Authorization === '') {
                        const tokenFromLocalStorage =
                          localStorage.getItem('token');
                        if (tokenFromLocalStorage) {
                          setToken(tokenFromLocalStorage);
                          config.headers.Authorization = `Bearer ${tokenFromLocalStorage}`;
                          fetchMessages(config, setMessages);
                        }
                      }
                      try {
                        await axios.post(
                          'https://messaging-api-hdnu.onrender.com/messages',
                          {
                            date: new Date(),
                            message: newMessage,
                            senderID: logInUser.userId,
                            receiverID: user._id,
                            updateDate: new Date(),
                          },
                          config
                        );
                        setNewMessage('');
                        fetchMessages(config, setMessages);
                        setSelectedUser(user);
                      } catch (error) {
                        console.log(error); // handle error
                      }

                      //clear the message box after sending the message
                      setNewMessage('');
                    }}
                  >
                    Send
                  </Button>
                </Box>
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
