import axios from 'axios';
import { BASE_URL } from '../api';

export const fetchRecord = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/records/getrecord/${id}`);
    return { data: response.data, status: 200 };
  } catch (err) {
    return { data: err.message, status: 404 };
  }
};
