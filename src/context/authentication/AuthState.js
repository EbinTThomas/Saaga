import { useState } from "react";
import authContext from "./authContext";


const AuthState = (props) => {
  const [loginState, setLoginState] = useState(false);
  return (
    <authContext.Provider value={{loginState, setLoginState}}>
      {props.children}
    </authContext.Provider>
  )

}
export default AuthState;