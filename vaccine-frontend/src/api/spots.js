import fetcher from './fetcher';

const BASE_URL = `${process.env.REACT_APP_API_URL}/spots`;

export const getSpots = async (token) => {
  return await fetcher(`${BASE_URL}?token=${token}`);
};

export const getSpotById = async (token, id, date) => {
  return await fetcher(`${BASE_URL}/${id}?token=${token}&date=${date}`);
};