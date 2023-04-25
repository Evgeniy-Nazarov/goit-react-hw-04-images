import axios from 'axios';
import PropTypes from 'prop-types';
import { API_KEY } from '../Key/pixabay-key';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const FetchImages = async (searchName, currentPage) => {
  const response = await axios.get('', {
    params: {
      key: API_KEY,
      q: searchName,
      page: currentPage,
      per_page: 12,
      image_type: 'photo',
      orientation: 'horizontal',
    },
  });
  return response.data;
};

FetchImages.propTypes = {
  searchName: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
};
