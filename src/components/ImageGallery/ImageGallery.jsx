import Button from 'components/Button/Button';
import PropTypes from 'prop-types';
import ImageFallbackView from 'components/ImageFallbackView/ImageFallbackView';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import { Component } from 'react';
import { FetchImages } from 'components/API/API';
import { Report } from 'notiflix';

export default class ImageGallery extends Component {
  state = {
    pictureName: null,
    error: null,
    status: 'idle',
    openModal: false,
    currentImage: '',
    currentPage: 2,
  };

  searchImages = async () => {
    const nextName = this.props.searchName;
    try {
      this.setState({ currentPage: 2 });
      const response = await FetchImages(nextName);

      if (response.total === 0) {
        Report.info(
          'Sorry, there are no images matching your search query. Please try again.',
          'No matches found'
        );
        this.setState({ status: 'idle' });
      }

      if (response.total > 0) {
        this.setState({ pictureName: response, status: 'resolved' });
      }
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  handleLoadMore = async () => {
    this.setState({ status: 'pending' });
    this.loadMore();
    const nextName = this.props.searchName;
    const nextPage = this.state.currentPage;

    try {
      const response = await FetchImages(nextName, nextPage);

      const nextImages = response.hits;
      const prevImages = this.state.pictureName.hits;
      const allImages = [...prevImages, ...nextImages];

      this.setState(prevState => ({
        pictureName: { hits: allImages },
        status: 'resolved',
      }));
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchName !== this.props.searchName) {
      this.setState({
        pictureName: null,
        status: 'pending',
        currentPage: 1,
      });
      this.searchImages();
      return;
    }
  }

  toggleModal = () => {
    this.setState(({ openModal }) => ({
      openModal: !openModal,
    }));
  };

  updateModalImage = img => {
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
          {hits.length > 11 && <Button handleLoadMore={this.handleLoadMore} />}
          {openModal && <Modal state={this.state} onClose={this.toggleModal} />}
        </div>
      );
    }
  }
}

ImageGallery.propTypes = {
  searchName: PropTypes.string.isRequired,
  updateImg: PropTypes.func,
  toggleModal: PropTypes.func,
  handleLoadMore: PropTypes.func,
  searchImages: PropTypes.func,
};
