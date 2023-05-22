import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { setLocalStorage } from '../utils/localStorage';
import { useAuthContext } from '../context/AuthContext';
import { login } from '../api/auth';

export default function Login() {
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  const [idCard, setIdCard] = useState('');
  const [password, setPassword] = useState('');
  const [fail, setFail] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { id_card_number: idCard, password };

    const result = await login(data);

    if (result.fail) {
      toast.error(result.fail.message);
      setFail(result.fail);
      return;
    }

    setFail({});
    setUser({ auth: true, data: result.data });
    setLocalStorage('user', result.data);
    toast.success('Login success!');
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className='h-screen w-screen flex flex-col justify-center'>
      <div className='max-w-xl w-full mx-auto'>
        <div className='mb-5'>
          <h1 className='text-4xl mb-2 font-bold'>Login</h1>
          <p className='text-zinc-500'>Before you entered the vaccination, please login first!</p>
        </div>
        <form action='' className='shadow p-10 rounded space-y-5' onSubmit={handleSubmit}>
          <div className='space-y-2'>
            <label htmlFor='id_card'>ID Card</label>
            <input
              id='id_card'
              type='text'
              placeholder='ID Card Number'
              className='border rounded px-5 py-2 w-full focus:border-blue-400 outline-none'
              onChange={(e) => setIdCard(e.target.value)}
            />

            {fail?.errors?.id_card_number && <small className='text-red-500'>{fail.errors.id_card_number}</small>}
          </div>
          <div className='space-y-2'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              placeholder='*******'
              className='border rounded px-5 py-2 w-full focus:border-blue-400 outline-none'
              onChange={(e) => setPassword(e.target.value)}
            />
            {fail?.errors?.password && <small className='text-red-500'>{fail.errors.password}</small>}
          </div>
          <button className='bg-blue-400 px-5 py-2 rounded font-bold text-white w-full' type='submit'>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
