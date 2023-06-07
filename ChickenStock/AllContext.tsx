import React, { createContext, useState } from 'react';

const LoginContext = createContext();

export function LoginContextProvider({children}){
  const [id,setId] = useState('');
  return(
    <LoginContext.Provider value={{id,setId}}>
      {children}
    </LoginContext.Provider>
  )
}

export default LoginContext;


