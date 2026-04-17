import { createContext, useMemo, useState } from 'react';
import { authService } from '../services/authService';
import { storage } from '../services/storage';
import { ROLES } from '../utils/constants';

export const AuthContext = createContext(null);

const roleRouteMap = {
  [ROLES.REQUESTER]: '/solicitante',
  [ROLES.DRIVER]: '/motorista',
  [ROLES.CONTROL]: '/central',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(storage.getUser());
  const [token, setToken] = useState(storage.getToken());

  const login = async (identifier, password) => {
    const response = await authService.login({ identifier, password });
    setUser(response.user);
    setToken(response.token);
    storage.setUser(response.user);
    storage.setToken(response.token);
    return roleRouteMap[response.user.role] || '/login';
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    storage.clearAll();
  };

  const value = useMemo(
    () => ({ user, token, login, logout, isAuthenticated: Boolean(token) }),
    [user, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
