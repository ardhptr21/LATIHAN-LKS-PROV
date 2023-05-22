import fetcher from './fetcher';

const BASE_URL = `${process.env.REACT_APP_API_URL}/consultations`;

export const getConsultation = async (token) => {
  return await fetcher(`${BASE_URL}?token=${token}`, 'GET', 'Get consultations failed!');
};


export const storeConsultation = async (token, data) => {
  return await fetcher(`${BASE_URL}?token=${token}`, 'POST', 'Store consultation failed!', data);
};