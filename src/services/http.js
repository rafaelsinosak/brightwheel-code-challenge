import axios from 'axios';
import queryString from 'query-string';

const URL = process.env.REACT_APP_API_URL;

const getAllResults = async (params) => {
  const stringified = queryString.stringify(params);
  const { data } = await axios.get(`${URL}/search?${stringified}`);
  return data;
};

const getResultsStarred = async () => {
  const { data } = await axios.get(`${URL}/search?starred=true`)
  return data.length;
};

const starItem = async (id, starred) => {
  const { data } = await axios.patch(`${URL}/search/${id}` , { starred: !starred } );
  return data;
};

const Http = {
  starItem,
  getAllResults,
  getResultsStarred,
};

export default Http;
