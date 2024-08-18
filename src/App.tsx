import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import Error from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import { fetchImages, ImageResult } from './httpQuery';
import toast, { Toaster } from 'react-hot-toast';
import css from './App.module.css';

// Опис типу даних для модального вікна
export interface ModalData {
  imageFullSrc: string;
  altText?: string;
}

// Опис стану
export interface AppState {
  images: ImageResult[];
  loading: boolean;
  error: boolean;
  page: number;
  topic: string;
  loadMore: boolean;
  totalPages: number;
  imageModal: boolean;
  modalData: ModalData | null;
}

export default function App() {
  const [images, setImages] = useState<ImageResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [topic, setTopic] = useState<string>('');
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [imageModal, setImageModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalData | null>(null);

  const handleSearch = async (newTopic: string) => {
    setImages([]);
    setPage(1);
    if (!newTopic) {
      toast.error('Please, enter something to search!', { position: 'top-right' });
      setLoadMore(false);
      return;
    }
    setTopic(newTopic);
  };

  const handleMoreBtn = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageModal = (modalData: ModalData) => {
    setImageModal(!imageModal);
    setModalData(modalData);
  };

  const handleModalClose = () => {
    setImageModal(!imageModal);
  };

  useEffect(() => {
    if (topic.trim() === '') {
      return;
    }

    const getImages = async () => {
      try {
        setError(false);
        setLoading(true);
        setLoadMore(false);
        const { results, totalPages } = await fetchImages(topic, page);

        if (results.length === 0 && page === 1) {
          setLoadMore(false);
          toast.error('Incorrect input, try something else!', { position: 'top-right' });
        } else {
          setImages(prevImages => [...prevImages, ...results]);
          setLoadMore(page < totalPages);
          if (page >= totalPages) {
            setLoadMore(false);
            toast('There are no more images to show!', { position: 'top-right' });
          }
          toast.success('Search successful!', { position: 'top-right' });
        }
        setTotalPages(totalPages);
      } catch (error) {
        toast.error('Oops... Something went wrong. Please, try again.', { position: 'top-right' });
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getImages();
  }, [topic, page]);

  return (
    <div className={css.container}>
      <SearchBar onSearch={handleSearch} />
      {loading && <Loader loading={loading} />}
      {error && <Error message={error.toString()} />}
      {images.length > 0 && <ImageGallery images={images} onImageClick={handleImageModal} />}
      {loadMore && <LoadMoreBtn onClick={handleMoreBtn} />}
      <ImageModal modalData={modalData} isModalOpen={imageModal} onModalClose={handleModalClose} />
      <Toaster />
    </div>
  );
}
