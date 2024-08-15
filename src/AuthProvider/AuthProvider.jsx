import { createUserWithEmailAndPassword } from "firebase/auth";
import { createContext } from "react";
import { auth } from "../Firebase/firebase.confige";

export const AuthContext = createContext(null)
// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {

    const signupUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const value = {
        signupUser
    }
    return (
        <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
    );
};

export default AuthProvider;