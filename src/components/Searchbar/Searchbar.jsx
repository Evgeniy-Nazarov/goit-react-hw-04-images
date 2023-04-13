import PropTypes from 'prop-types';
import { Component } from 'react';
import { toast } from 'react-toastify';

export default class Searchbar extends Component {
  state = {
    tags: '',
  };

  handleNameChange = event => {
    this.setState({ tags: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.tags.trim() === '') {
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
    this.props.onSubmit(this.state.tags);
    this.setState({ tags: '' });
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="form-button">
            <span className="button-label">Search</span>
          </button>

          <input
            className="input"
            type="text"
            placeholder="Search images and photos"
            value={this.state.tags}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  tags: PropTypes.string,
};
