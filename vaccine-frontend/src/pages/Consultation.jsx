import { useState } from 'react';
import Layout from '../components/Layout';
import { storeConsultation } from '../api/consultations';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Consultation({ user }) {
  const navigate = useNavigate();

  const [diseaseHistory, setDiseaseHistory] = useState(null);
  const [symptoms, setSymptoms] = useState(null);

  const [visibleState, setVisibleState] = useState({ diseaseHistory: false, symptoms: false });

  const handleChangeVisibilityState = (state) => (e) => {
    setVisibleState({ ...visibleState, [state]: e.target.value === '1' });
    if (e.target.value === '0') {
      if (state === 'diseaseHistory') {
        setDiseaseHistory(null);
      } else {
        setSymptoms(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {};
    if (visibleState.diseaseHistory) data.disease_history = diseaseHistory;
    if (visibleState.symptoms) data.current_symptoms = symptoms;

    const result = await storeConsultation(user.data?.token, data);

    if (result.fail) return toast.error(result.fail.message);

    toast.success('Consultation request sent!');
    navigate('/dashboard', { replace: true });
  };

  return (
    <Layout title='Request Consultation'>
      <form onSubmit={handleSubmit} className='space-y-5 max-w-xl'>
        <div className='flex gap-2 items-center'>
          <p>Do you have disease history?</p>
          <select onChange={handleChangeVisibilityState('diseaseHistory')} className='border-2 px-1 rounded'>
            <option value='0'>No, I don't have</option>
            <option value='1'>Yes, I have</option>
          </select>
        </div>
        {visibleState.diseaseHistory && (
          <textarea
            onChange={(e) => setDiseaseHistory(e.target.value)}
            className='border rounded p-2 w-full'
            rows='10'
            placeholder='Describe your disease history'
          ></textarea>
        )}
        <div className='flex gap-2 items-center'>
          <p>Do you have symptoms now?</p>
          <select onChange={handleChangeVisibilityState('symptoms')} className='border-2 px-1 rounded'>
            <option value='0'>No</option>
            <option value='1'>Yes</option>
          </select>
        </div>
        {visibleState.symptoms && (
          <textarea
            onChange={(e) => setSymptoms(e.target.value)}
            className='border rounded p-2 w-full'
            rows='10'
            placeholder='Describe your symptoms'
          ></textarea>
        )}
        <button className='bg-blue-400 hover:bg-blue-500 px-5 py-2 rounded font-bold text-white' type='submit'>
          Send Request
        </button>
      </form>
    </Layout>
  );
}
