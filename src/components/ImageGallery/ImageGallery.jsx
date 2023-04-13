import Button from 'components/Button/Button';
import PropTypes from 'prop-types';
import ImageFallbackView from 'components/ImageFallbackView/ImageFallbackView';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import { Component } from 'react';

export default class ImageGallery extends Component {
  state = {
    pictureName: null,
    error: null,
    status: 'idle',
    currentPage: 1,
    openModal: false,
    currentImage: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const API_KEY = '33830559-b80d1d0487f9caaadda577109';
    const prevName = prevProps.searchName;
    const nextName = this.props.searchName;
    const prevPage = prevState.currentPage;
    const nextPage = this.state.currentPage;

    if (prevPage !== nextPage) {
      fetch(
        `https://pixabay.com/api/?q=${nextName}&page=${nextPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok && response.status === 200) {
            return response.json();
          }
        })
        .then(pictureName => {
          if (pictureName.total === 0) {
            return Promise.reject(
              new Error(`Изображение ${nextName} не найдено`)
            );
          }
          this.setState(prevState => ({
            pictureName: {
              ...prevState.pictureName,
              hits: [...prevState.pictureName.hits, ...pictureName.hits],
            },
          }));
        })

        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    if (prevName !== nextName) {
      this.setState({ status: 'pending' });

      fetch(
        `https://pixabay.com/api/?q=${nextName}&page=${nextPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok && response.status === 200) {
            return response.json();
          }
        })
        .then(pictureName => {
          if (pictureName.total === 0) {
            return Promise.reject(
              new Error(`Изображение ${nextName} не найдено`)
            );
          }
          this.setState({ pictureName, status: 'resolved' });
        })

        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  toggleModal = () => {
    this.setState(({ openModal }) => ({
      openModal: !openModal,
    }));
  };

  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  updateModalImage = img => {
    console.log(img);
    this.setState({ currentImage: img.largeImageURL });
  };

  render() {
    const { pictureName, error, status, openModal } = this.state;
    const hits = pictureName?.hits;

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <ImageFallbackView message={error.message} />;
    }

    if (status === 'resolved') {
      return (
        <div>
          <ul className="image-gallery">
            <ImageGalleryItem
              hits={hits}
              onClick={this.toggleModal}
              state={this.state}
              updateImg={this.updateModalImage}
            />
          </ul>
          {hits.length > 11 && <Button onClick={this.loadMore} />}
          {openModal && <Modal state={this.state} onClose={this.toggleModal} />}
        </div>
      );
    }
  }
}

ImageGallery.propTypes = {
  searchName: PropTypes.string.isRequired,
};
