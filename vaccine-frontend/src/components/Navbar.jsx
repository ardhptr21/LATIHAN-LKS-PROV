import { toast } from 'react-toastify';

import { logout } from '../api/auth';
import { useAuthContext } from '../context/AuthContext';
import { removeLocalStorage } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await logout(user.data.token);

    if (result.fail) return toast.error(result.fail.message, { position: 'bottom-right' });

    removeLocalStorage('user');
    navigate('/login', { replace: true });
    toast.success(result.data.message, { position: 'bottom-right' });
  };

  return (
    <nav className='bg-blue-400 px-32 py-5 flex w-full items-center justify-between'>
      <div>
        <a href='/' className='text-white text-xl'>
          Vaccination Platform
        </a>
      </div>
      <div className='inline-flex gap-3 text-white'>
        <p className='font-bold'>{user.data?.name}</p>|
        <button className='hover:underline' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
