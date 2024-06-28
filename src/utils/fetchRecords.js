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

export const fetchSimilarCourseRecord=async(name)=>{
  try {
    const response = await axios.get(`${BASE_URL}/records/getsimilarcourserecords/${name}`);
    return { data: response.data, status: 200 };
  } catch (err) {
    return { data: err.message, status: 404 };
  }
}