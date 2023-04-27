import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const Searchbar = ({ onSubmit }) => {
  const [tags, setTags] = useState('');

  const handleNameChange = event => {
    setTags(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (tags.trim() === '') {
      toast('Введите название картинки', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }
    onSubmit(tags);
    setTags('');
  };

  return (
    <header className="searchbar">
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit" className="form-button">
          <span className="button-label">Search</span>
        </button>

        <input
          className="input"
          type="text"
          placeholder="Search images and photos"
          value={tags}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  tags: PropTypes.string,
};
