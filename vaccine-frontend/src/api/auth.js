import fetcher from "./fetcher";
const BASE_URL = `${process.env.REACT_APP_API_URL}/auth`;

export const login = async (creds) => {
  return await fetcher(`${BASE_URL}/login`, 'POST', 'Login failed!', creds);
};

export const logout = async (token) => {
  return await fetcher(`${BASE_URL}/logout?token=${token}`, 'POST', 'Logout failed!');
};