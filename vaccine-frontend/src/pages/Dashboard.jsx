import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../components/Layout';
import { getConsultation } from '../api/consultations';
import { getVaccinations } from '../api/vaccinations';
import TableInfo from '../components/TableInfo';

export default function Dashboard({ user }) {
  const [consultation, setConsultation] = useState({});
  const [vaccinations, setVaccinations] = useState({ first: null, second: null });

  useEffect(() => {
    if (user.auth) {
      handleGetConsultation();
      handleGetVaccinations();
    }
  }, [user]);

  const handleGetConsultation = async () => {
    const result = await getConsultation(user.data?.token);
    if (!result.fail) setConsultation(result.data);
  };

  const handleGetVaccinations = async () => {
    const result = await getVaccinations(user.data?.token);
    if (!result.fail) setVaccinations(result.data.vaccinations);
  };

  return (
    <Layout title='Dashboard'>
      <section>
        <h2 className='text-2xl text-zinc-500 font-semibold mb-5'>My Consultation</h2>
        <div className='rounded border max-w-fit min-w-[350px]'>
          <h3 className='px-5 py-2 text-lg bg-zinc-100'>Consultation</h3>
          <div>
            {Object.keys(consultation).length === 0 ? (
              <Link to='consultation' className='text-blue-400 py-2 px-5 inline-block'>
                + <span className='hover:underline'>Request Consultation</span>
              </Link>
            ) : (
              <TableInfo
                badge={['Status', consultation.status]}
                data={{
                  'Disease History': consultation.disease_history,
                  'Current Symptoms': consultation.current_symptoms,
                  'Doctor Name': consultation.doctor?.name,
                  'Doctor Notes': consultation.doctor_notes,
                }}
              />
            )}
          </div>
        </div>
      </section>

      <section className='mt-16'>
        <h2 className='text-2xl text-zinc-500 font-semibold mb-5'>My Vaccinations</h2>
        {consultation.status !== 'accepted' ? (
          <div className='bg-yellow-100 border border-yellow-300 rounded px-3 py-2'>
            Your consultation must be approved by doctor to get the vaccine
          </div>
        ) : (
          <div className='flex items-start gap-10'>
            <div className='rounded border max-w-fit min-w-[350px]'>
              <h3 className='px-5 py-2 text-lg bg-zinc-100'>First Vaccination</h3>
              {!vaccinations.first ? (
                <div>
                  <Link to='vaccinations?at=1' className='text-blue-400 py-2 px-5 inline-block'>
                    + <span className='hover:underline'>Request Vaccination</span>
                  </Link>
                </div>
              ) : (
                <TableInfo
                  data={{
                    Date: vaccinations.first?.vaccination_date,
                    Spot: vaccinations.first?.spot?.name,
                    Vaccine: vaccinations.first?.vaccine?.name,
                    Vaccinator: vaccinations.first?.vaccinator?.name,
                  }}
                />
              )}
            </div>

            {vaccinations.first && (
              <div className='rounded border max-w-fit min-w-[350px]'>
                <h3 className='px-5 py-2 text-lg bg-zinc-100'>Second Vaccination</h3>
                {!vaccinations.second ? (
                  <div>
                    <Link to='vaccinations?at=2' className='text-blue-400 py-2 px-5 inline-block'>
                      + <span className='hover:underline'>Request Vaccination</span>
                    </Link>
                  </div>
                ) : (
                  <TableInfo
                    data={{
                      Date: vaccinations.second?.vaccination_date,
                      Spot: vaccinations.second?.spot?.name,
                      Vaccine: vaccinations.second?.vaccine?.name,
                      Vaccinator: vaccinations.second?.vaccinator?.name,
                    }}
                  />
                )}
              </div>
            )}
          </div>
        )}
      </section>
    </Layout>
  );
}
