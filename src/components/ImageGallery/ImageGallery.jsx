import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FetchImages } from 'components/API/API';
import { Report } from 'notiflix';
import { Modal } from 'components/Modal/Modal';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { ImageFallbackView } from 'components/ImageFallbackView/ImageFallbackView';

export const ImageGallery = ({ searchName }) => {
  const [pictureName, setPictureName] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [openModal, setOpenModal] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [currentPage, setCurrentPage] = useState(2);

  const loadMore = () => {
    setCurrentPage(prevState => prevState + 1);
  };

  const handleLoadMore = async () => {
    setStatus('pending');
    loadMore();

    try {
      const response = await FetchImages(searchName, currentPage);

      const nextImages = response.hits;
      const prevImages = pictureName.hits;
      const allImages = [...prevImages, ...nextImages];

      setPictureName({ hits: allImages });
      setStatus('resolved');
    } catch (error) {
      setError(error);
      setStatus('rejected');
    }
  };

  useEffect(() => {
    if (searchName) {
      const searchImages = async () => {
        try {
          setCurrentPage(2);
          const response = await FetchImages(searchName);

          if (response.total === 0) {
            Report.info(
              'Sorry, there are no images matching your search query. Please try again.',
              'No matches found'
            );
            setStatus('idle');
          }

          if (response.total > 0) {
            setPictureName(response);
            setStatus('resolved');
          }
        } catch (error) {
          setError(error);
          setStatus('rejected');
        }
      };
      searchImages();
    }
  }, [searchName]);

  const toggleModal = () => {
    setOpenModal(prevState => !prevState);
  };

  const updateModalImage = img => {
    setCurrentImage(img.largeImageURL);
  };

  const hits = pictureName?.hits;

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'rejected') {
    return <ImageFallbackView message={error} />;
  }

  if (status === 'resolved') {
    return (
      <div>
        <ul className="image-gallery">
          <ImageGalleryItem
            hits={hits}
            onClick={toggleModal}
            updateImg={updateModalImage}
            pictureName={pictureName}
            error={error}
            status={status}
            openModal={openModal}
            currentImage={currentImage}
            currentPage={currentPage}
          />
        </ul>
        {hits.length > 11 && <Button handleLoadMore={handleLoadMore} />}
        {openModal && (
          <Modal currentImage={currentImage} onClose={toggleModal} />
        )}
      </div>
    );
  }
};

ImageGallery.propTypes = {
  searchName: PropTypes.string.isRequired,
  updateImg: PropTypes.func,
  toggleModal: PropTypes.func,
  handleLoadMore: PropTypes.func,
  searchImages: PropTypes.func,
};
