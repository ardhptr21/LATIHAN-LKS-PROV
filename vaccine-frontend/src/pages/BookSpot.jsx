import { useNavigate, useParams } from 'react-router-dom';

import Layout from '../components/Layout';
import { getSpotById } from '../api/spots';
import { useEffect, useState } from 'react';
import { storeVaccination } from '../api/vaccinations';
import { toast } from 'react-toastify';

export default function BookSpot({ user }) {
  const navigate = useNavigate();
  const { spotId } = useParams();

  const [spot, setSpot] = useState({});
  const [vaccinationsCount, setVaccinationsCount] = useState(0);
  const [vaccines, setVaccines] = useState([]);

  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [session, setSession] = useState(0);
  const [vaccine, setVaccine] = useState(null);

  useEffect(() => {
    if (user.auth) {
      handleGetSpot();
    }
  }, [user, date]);

  const handleGetSpot = async () => {
    const result = await getSpotById(user.data?.token, spotId, date);
    if (!result.fail) {
      setSpot(result.data.spot);
      setVaccines(result.data.vaccines);
      setVaccinationsCount(result.data.vaccinations_count);
      setSession(Math.ceil(result.data.spot.capacity / 3));
    }
  };

  const handleRequestVaccination = async () => {
    const data = { spot_id: spotId, date: date, vaccine_id: vaccine };
    const result = await storeVaccination(user.data?.token, data);

    if (result.fail) return toast.error(result.fail.message);

    toast.success(result.data.message);
    navigate('/dashboard', { replace: true });
  };

  return (
    <Layout title={spot.name} subtitle={spot.address}>
      <div className='inline-flex justify-between items-center w-full'>
        <div>
          <p className='mb-2 text-lg'>Select vaccination date</p>
          <input
            className='border rounded px-3 py-1'
            type='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <p className='mb-2 text-lg'>Select vaccine</p>
          <select className='border rounded px-3 py-1' onChange={(e) => setVaccine(e.target.value)}>
            <option value=''>-- SELECT VACCINE --</option>
            {vaccines.map((v) => (
              <option value={v.id} key={v.name}>
                {v.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleRequestVaccination}
          className='bg-blue-400 hover:bg-blue-500 px-5 py-2 rounded font-bold text-white'
          type='button'
        >
          Request vaccination
        </button>
      </div>
      <div className='mt-10 grid grid-cols-3 gap-5 w-full'>
        <div className='border-2 p-5 rounded'>
          <div className='inline-flex w-full justify-between items-center'>
            <h2 className='text-xl font-bold'>Session 1</h2>
            <p className='text-zinc-500'>09:00 - 11:00</p>
          </div>
          <div className='mt-10 grid grid-cols-3 gap-10'>
            {[...Array(session)].map((_, index) => (
              <div
                key={index}
                className={`border rounded p-5 text-center 
                ${index + 1 <= vaccinationsCount ? 'border-green-500' : ''}
                ${vaccinationsCount + 1 === index + 1 ? 'bg-blue-400 text-white' : ''}`}
              >
                #{index + 1}
              </div>
            ))}
          </div>
        </div>
        <div className='border-2 p-5 rounded'>
          <div className='inline-flex w-full justify-between items-center'>
            <h2 className='text-xl font-bold'>Session 2</h2>
            <p className='text-zinc-500'>13:00 - 15:00</p>
          </div>
          <div className='mt-10 grid grid-cols-3 gap-10'>
            {[...Array(Math.ceil(session))].map((_, index) => (
              <div key={index + session + 1} className='border rounded p-5 text-center'>
                #{index + session + 1}
              </div>
            ))}
          </div>
        </div>
        <div className='border-2 p-5 rounded'>
          <div className='inline-flex w-full justify-between items-center'>
            <h2 className='text-xl font-bold'>Session 3</h2>
            <p className='text-zinc-500'>15:00 - 17:00</p>
          </div>
          <div className='mt-10 grid grid-cols-3 gap-10'>
            {[...Array(Math.ceil(spot.capacity - session * 2) || 0)].map((_, index) => (
              <div key={index + session * 2 + 1} className='border rounded p-5 text-center'>
                #{index + session * 2 + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
