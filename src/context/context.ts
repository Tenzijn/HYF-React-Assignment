import { createContext } from 'react';

type UserContextType = {
  users: [] | null;
  setUsers: (user: [] | null) => void;
  token: string;
  setToken: (token: string) => void;
};

export const UserContext = createContext<UserContextType>({
  users: [],
  setUsers: () => {},
  token: '',
  setToken: () => {},
});
