import { useState, useEffect } from "react";
import { Container } from './App.styled';
import { Searchbar } from '../Searchbar';
import { ImageGallery } from '../ImageGallery';
import { Button } from '../Button';
import { Loader } from '../Loader';
import { fetchGalleryWithQuery } from '../../services/pixabay-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const App = () => {
  const [query, setQuery] = useState('');
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (query) fetchImages();

    async function fetchImages() {
      setStatus('pending');
      try {
          const { hits, total, totalHits } = await fetchGalleryWithQuery(query, page);

          if (total === 0) {
              const error = new Error('Sorry, there are no images matching your search query.')
              setStatus('rejected');
              setError(error);
              return;
          };

        // setGallery(prevGallery => (page === 1 ? hits : [...prevGallery, ...hits]));
        setGallery(prev =>  [...prev, ...hits]);
        setTotalPages(Math.floor(totalHits / 12));
        setStatus('resolved');
      } catch (error) {
          setStatus('rejected');
          setError(error);
      };
    };
  }, [page, query]);
  
  
  const searchFormSubmitHandler = query => {
    setQuery(query);
    setPage(1);
    setGallery([]);
    setError(null);
  };

  const loadMoreHandler = () => setPage(prevPage => prevPage + 1);

  return (
      <Container>
        <Searchbar onSubmit={searchFormSubmitHandler} />
        {status === 'pending' && <Loader />};
        {status === 'rejected' && Notify.failure(`${error.message}`)};
        {status === 'resolved' && <ImageGallery gallery={gallery} />}
        {status === 'resolved' && page < totalPages && <Button onClick={loadMoreHandler}>Load more</Button>}
      </Container>
    );
};
