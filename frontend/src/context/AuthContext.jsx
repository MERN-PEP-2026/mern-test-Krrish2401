import { createContext, useContext, useState, useMemo } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        const { user: userData, token } = res.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return res.data;
    };

    const register = async (name, email, password) => {
        const res = await api.post('/auth/register', { name, email, password });
        const { user: userData, token } = res.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const value = useMemo(
        () => ({ user, login, register, logout, loading: false }),
        [user]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
