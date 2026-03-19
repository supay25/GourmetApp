import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(
    () => sessionStorage.getItem('admin_auth') === 'true'
  );
  // Token JWT del backend — necesario para llamadas a endpoints protegidos
  const [token, setToken] = useState(
    () => sessionStorage.getItem('admin_token') || null
  );

  // Login real contra el backend usando username o email
  const loginWithBackend = async (identifier, password) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password }),
    });
    if (!res.ok) throw new Error('Credenciales incorrectas');
    const data = await res.json();
    // Guardar sesión y token en sessionStorage
    sessionStorage.setItem('admin_auth', 'true');
    sessionStorage.setItem('admin_token', data.token);
    setIsAuth(true);
    setToken(data.token);
    return data;
  };

  const logout = () => {
    // Limpiar sesión completa
    sessionStorage.removeItem('admin_auth');
    sessionStorage.removeItem('admin_token');
    setIsAuth(false);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuth, token, loginWithBackend, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);