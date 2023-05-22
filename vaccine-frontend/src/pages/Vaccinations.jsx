import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

import Layout from '../components/Layout';
import { getSpots } from '../api/spots';

export default function Vaccinations({ user }) {
  const [params] = useSearchParams();

  const [spots, setSpots] = useState([]);

  useEffect(() => {
    if (user.auth) {
      handleGetSpots();
    }
  }, [user]);

  const handleGetSpots = async () => {
    const result = await getSpots(user.data?.token);
    if (!result.fail) setSpots(result.data.spots);
  };

  return (
    <Layout title={`${params.get('at') === '1' ? 'First' : 'Second'} Vaccination`}>
      <h3 className='text-xl font-semibold text-zinc-500'>List Vaccination Spots in {user.data?.regional?.district}</h3>
      <div className='space-y-5 mt-10'>
        {spots.map((spot) => (
          <Link
            to={spot.serve !== 3 && spot.serve != params.get('at') ? `?at=${params.get('at')}` : `spots/${spot.id}`}
            key={spot.id}
            className={`flex flex-row justify-between items-center p-5 bg-zinc-100 ${
              spot.serve !== 3 && spot.serve != params.get('at') ? 'opacity-40 cursor-not-allowed' : ''
            }`}
          >
            <div className='flex-1'>
              <h4 className='text-lg text-blue-400 font-bold'>{spot.name}</h4>
            </div>
            <div className='flex-1'>
              <h4 className='text-lg font-bold'>Available vaccines</h4>
              <p className='text-sm text-gray-500 font-semibold'>{spot.available_vaccines.join(', ')}</p>
            </div>
            <div className='flex-1'>
              <h4 className='text-lg font-bold'>Serve</h4>
              <p className='text-sm text-gray-500 font-semibold'>
                {spot.serve === 1 && 'Only first vaccination'}
                {spot.serve === 2 && 'Only second vaccination'}
                {spot.serve === 3 && 'Both vaccination'}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
