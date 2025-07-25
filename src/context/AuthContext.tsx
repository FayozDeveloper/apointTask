import {createContext, useContext, useEffect, useState} from "react";
import type {ReactNode} from "react";

type AuthContextType = {
    token: string | null;
    login: (token: string, refreshToken?: string) => void;
    logout: () => void;
    isAuthorized: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children} : {children: ReactNode}) => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token){
            setToken(token)
        }
        setLoading(false);
    }, []);

    const login = (token: string, refreshToken?: string) => {
        setToken(token);
        localStorage.setItem('token', token);
        if (refreshToken){
            localStorage.setItem('refreshToken', refreshToken);
        }
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    }

    return (
        <AuthContext.Provider value={{token, login, logout, isAuthorized: !!token, loading}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth должен использоваться внутри AuthProvider');

    return ctx;
}