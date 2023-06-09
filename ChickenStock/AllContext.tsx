import React, { createContext, useState } from 'react';

// Define the context type
interface AuthContextProps {
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context
export const AuthContext = createContext<AuthContextProps>({
  userId: '',
  setUserId: () => {},
});

// Context provider component
export const AuthProvider: React.FC = ({ children }) => {
  const [userId, setUserId] = useState('');

  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};
