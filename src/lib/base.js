import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';
const CLOUD_NAME = 'doxsstgkc1';

const base = axios.create({
  baseURL,
});


base.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export const basePrivate = axios.create({
  baseURL,
  withCredentials: true,
});


basePrivate.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export const axiosImage = axios.create({
  baseURL: `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
});


axiosImage.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default base;