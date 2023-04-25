import { createContext, useState } from "react"
import PropTypes from 'prop-types';

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({})
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated'))
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

    return (
        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist, isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext