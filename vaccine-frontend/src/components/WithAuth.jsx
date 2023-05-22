import { useEffect, cloneElement } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getLocalStorage } from '../utils/localStorage';

export default function WithAuth({ children }) {
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.auth) {
      const user = getLocalStorage('user');

      if (!user) return navigate('/login', { replace: true });

      setUser({ auth: true, data: user });
    }
  }, [navigate, setUser, user.auth]);

  return cloneElement(children, { user });
}
