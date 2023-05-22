import fetcher from "./fetcher";

const BASE_URL = `${process.env.REACT_APP_API_URL}/vaccinations`;

export const getVaccinations = async (token) => {
  return await fetcher(`${BASE_URL}?token=${token}`);
};

export const storeVaccination = async (token, data) => {
  return await fetcher(`${BASE_URL}?token=${token}`, 'POST', 'Request vaccination failed!', data);
};