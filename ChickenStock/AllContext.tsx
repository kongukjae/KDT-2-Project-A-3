import React, { createContext, useState } from 'react';

// 컨텍스트 타입을 정의 
interface AuthContextProps {
  userHoga:string;
  setUserHoga:(userHoga:string)=>void;
  userId: string;
  setUserId: (userid:string) => void;
  companyName: string;
  setCompanyName: (companyName:string) => void;
  companyPrice: number;
  setCompanyPrice: (companyPrice:number) => void;
  // userCategoryCurrent: string;
  // setUserCategoryCurrent: (userid:string) => void;
}
// 컨텍스트 생성
export const AuthContext = createContext<AuthContextProps>({
  userHoga:'',
  setUserHoga:()=>{},
  userId: '',
  setUserId: () => {},
  companyName: '',
  setCompanyName: () => {},
  companyPrice: 0,
  setCompanyPrice: () => {},
  // userCategoryCurrent: '',
  // setUserCategoryCurrent: () => {},
});

// 컨텍스트 provider를 통해 컨텍스트에 값 수정 
export const AuthProvider: React.FC<{children:React.ReactNode}> = ({ children }) => {
  const [userHoga, setUserHoga] = useState('');
  const [userId, setUserId] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyPrice, setCompanyPrice] = useState<number>(0);
  const [userCategoryCurrent, setUserCategoryCurrent] = useState<string>('');

  return (
    <AuthContext.Provider value={{userHoga,setUserHoga, userId, setUserId,companyName,setCompanyName,companyPrice,setCompanyPrice}}>
      {children}
    </AuthContext.Provider>
  );
};
