import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

const useAuth = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

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

  return {
    user,
    loading,
    login,
    logout,
  };
};

export default useAuth;
