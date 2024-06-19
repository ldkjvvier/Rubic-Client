import { createContext, useState, useEffect } from 'react';
import { AuthResponse, LoginData, User } from '../types/user';
import { verifyTokenService } from '../services/verifyTokenService';
import { Navigate } from 'react-router';
import { loginService } from '../api/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User;
  error: string;
  saveUser: (userData: AuthResponse) => void;
  isLoading: boolean;
  logout: () => void;
  signin: (credentials: LoginData) => void;
}

const defaultUser = {
  id: '',
  name: '',
  lastname: '',
  email: '',
  role: ''
} as User;

const AuthContext = createContext({} as AuthContextType);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>(defaultUser);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const data = await verifyTokenService();
        if (data.statusCode !== 200) {
          return unauthorized();
        }
        console.log(data);
        saveSessionInfo(data.body.user);
        setIsAuthenticated(true);
        setIsLoading(false);
      } catch (error) {
        return unauthorized();
      }
    };
    checkAuth();
  }, []);

  const unauthorized = () => {
    setIsAuthenticated(false);
    setUser(defaultUser);
    setIsLoading(false);
    return <Navigate to="/" />;
  };
  const saveSessionInfo = (user: User) => {
    console.log({ user });
    setIsAuthenticated(true);
    setUser(user);
    return;
  };

  const saveUser = (userData: AuthResponse) => {
    saveSessionInfo(userData.body.user);
  };

  const logout = async () => {
    try {
      const res = await fetch('http://localhost:5000/v1/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      const data = await res.json();
      if (data.statusCode === 200) {
        unauthorized();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signin = async (credentials: LoginData) => {
    setIsLoading(true);
    setError('');

    try {
      const res = await loginService(credentials);
      console.log(res);
      saveUser(res);

      setIsAuthenticated(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Error en el inicio de sesión');
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        error,
        saveUser,
        isLoading,
        logout,
        signin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext }; // Asegúrate de exportar AuthContext
export default AuthProvider;
