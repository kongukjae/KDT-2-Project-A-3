import React, { createContext, useState } from 'react';

// Define the context type
interface AuthContextProps {
  userId: string;
  setUserId: (userid:string) => void;
  companyName: string;
  setCompanyName: (companyName:string) => void;
  companyPrice: number;
  setCompanyPrice: (companyPrice:number) => void;
}

// Create the context
export const AuthContext = createContext<AuthContextProps>({
  userId: '',
  setUserId: () => {},
  companyName: '',
  setCompanyName: () => {},
  companyPrice: 0,
  setCompanyPrice: () => {}

});

// Context provider component
export const AuthProvider: React.FC<{children:React.ReactNode}> = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyPrice, setCompanyPrice] = useState<number>(0);

  return (
    <AuthContext.Provider value={{ userId, setUserId,companyName,setCompanyName,companyPrice,setCompanyPrice}}>
      {children}
    </AuthContext.Provider>
  );
};
