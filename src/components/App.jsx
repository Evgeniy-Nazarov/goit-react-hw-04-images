import PropTypes from 'prop-types';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';

export const App = () => {
  const [tags, setTags] = useState('');

  const handleSubmit = tags => {
    setTags(tags);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery searchName={tags} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

App.propTypes = {
  tags: PropTypes.string,
};
