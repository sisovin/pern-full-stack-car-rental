import { createContext, useContext, useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') {
      setLoading(true);
    } else if (status === 'authenticated') {
      setUser(session.user);
      setLoading(false);
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [status, session]);

  const login = async (email, password) => {
    setLoading(true);
    const result = await signIn('credentials', { redirect: false, email, password });
    setLoading(false);
    return result;
  };

  const logout = async () => {
    setLoading(true);
    await signOut({ redirect: false });
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
