import { createContext, useContext, useEffect, useState } from "react";
import { registerInfo, loginInfo, verifyTokenRequest} from "../api/auth";
import Cookies from "js-cookie";

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth puede ser usado dentro de AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);

    const updateUser = (updatedData) => {
        setUser(updatedData);
    };

    const signup = async (user) => {
        try {
            const res = await registerInfo(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
            // Obtener el token de las cookies después del registro
            const cookieToken = Cookies.get("token");
            setToken(cookieToken);
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    const signin = async (user) => {
        try {
            const res = await loginInfo(user);
            console.log(res);
            // Asegurar que tenemos toda la información del usuario incluyendo roles
            setUser(res.data);
            setIsAuthenticated(true);
            // Obtener el token de las cookies después del login
            const cookieToken = Cookies.get("token");
            setToken(cookieToken);
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message]);
        }
    };

    const logout = async () => {
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
    };

    // Función auxiliar para verificar si el usuario es administrador
    const isAdmin = () => {
        if (!user || !user.roles) return false;
        return user.roles.some(role => role.nombre === "admin");
    };
    // Función auxiliar para verificar si el usuario tiene un rol específico
    const hasRole = (roleName) => {
        if (!user || !user.roles) return false;
        return user.roles.some(role => role.nombre === roleName);
    };

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
        async function checklogin() {
            const cookies = Cookies.get();

            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                setToken(null);
                return setUser(null);
            }

            try {
                const res = await verifyTokenRequest(cookies.token);
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    setToken(null);
                    return;
                }

                setIsAuthenticated(true);
                setUser(res.data);
                setToken(cookies.token);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
                setToken(null);
                setLoading(false);
            }
        }
        checklogin();
    }, []);

    return (
        <AuthContext.Provider value={{
            signup,
            user,
            signin,
            logout,
            loading,
            isAuthenticated,
            errors,
            updateUser,
            token,
            isAdmin,
            hasRole
        }}>
            {children}
        </AuthContext.Provider>
    );
}