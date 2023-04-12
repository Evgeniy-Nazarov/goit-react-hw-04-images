import Button from 'components/Button/Button';
import ImageFallbackView from 'components/ImageFallbackView/ImageFallbackView';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import { Component } from 'react';

export default class ImageGallery extends Component {
  state = {
    pictureName: null,
    error: null,
    status: 'idle',
    currentPage: 1,
  };

  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    const API_KEY = '33830559-b80d1d0487f9caaadda577109';
    const prevName = prevProps.searchName;
    const nextName = this.props.searchName;

    if (prevName !== nextName) {
      this.setState({ status: 'pending' });

      setTimeout(() => {
        fetch(
          `https://pixabay.com/api/?q=${nextName}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12&page=${this.state.currentPage}`
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
      }, 3000);
    }
  }

  render() {
    const { pictureName, error, status } = this.state;
    const hits = pictureName?.hits;

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <ImageFallbackView message={error.message} />;
    }

    if (status === 'resolved') {
      return (
        <ul className="image-gallery">
          <ImageGalleryItem hits={hits} />
        </ul>
      );
    }

    if (status === 'resolved') {
      return <Button loadMore={this.loadMore} />;
    }
  }
}
