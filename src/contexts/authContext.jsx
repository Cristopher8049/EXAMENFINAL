import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (email, password) => {
        try {
            const response = await fetch(`http://localhost:8000/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('userId', data.user.userId);
                setUserId(data.user.userId);
                setUser(data.user);
                console.log("Login successful:", data);
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            const response = await fetch(`http://localhost:8000/auth/logout`, {
                method: 'POST',
                credentials: 'include',
            });

            if (response.ok) {
                setUser(null);
                localStorage.removeItem('authToken');
                localStorage.removeItem('userId');
                console.log("Logout successful, token removed");
            } else {
                throw new Error('Logout failed');
            }
        } catch (error) {
            console.error('Error logging out:', error);
            throw error;
        }
    };

    const checkAuth = async () => {
        try {
            const response = await fetch('http://localhost:8000/auth/verify', {
                method: 'GET',
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                const storedUserId = localStorage.getItem('userId');
                setUserId(storedUserId);

            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Error checking auth:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, checkAuth, userId }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
