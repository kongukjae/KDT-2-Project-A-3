import React, { createContext, useState } from 'react';

// 컨텍스트 타입을 정의 
interface AuthContextProps {
  userId: string;
  userHoga: string;
  setUserId: (userid:string) => void;
  setUserHoga:(userHoga:string) => void;
}

// 컨텍스트 생성
export const AuthContext = createContext<AuthContextProps>({
  userId: '',
  setUserId: () => {},
  userHoga:'',
  setUserHoga:()=> {},
});

// 컨텍스트 provider를 통해 컨텍스트에 값 수정 
export const AuthProvider: React.FC<{children:React.ReactNode}> = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [userHoga, setUserHoga] = useState('');

  return (
    <AuthContext.Provider value={{ userId, setUserId, userHoga, setUserHoga }}>
      {children}
    </AuthContext.Provider>
  );
};
