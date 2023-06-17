import React, { createContext, useState } from 'react';

// Define the context type
interface AuthContextProps {
  userId: string;
  userHoga: string;
  setUserId: (userid:string) => void;
  setUserHoga:(userHoga:string) => void;
}

// Create the context
export const AuthContext = createContext<AuthContextProps>({
  userId: '',
  setUserId: () => {},
  userHoga:'',
  setUserHoga:()=> {},
});

// Context provider component
export const AuthProvider: React.FC<{children:React.ReactNode}> = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [userHoga, setUserHoga] = useState('');

  return (
    <AuthContext.Provider value={{ userId, setUserId, userHoga, setUserHoga }}>
      {children}
    </AuthContext.Provider>
  );
};
