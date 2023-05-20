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
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (query) fetchImages();

    async function fetchImages() {
      setIsLoading(true);
      try {
          const { hits, total, totalHits } = await fetchGalleryWithQuery(query, page);

          if (total === 0) {
              const error = new Error('Sorry, there are no images matching your search query.')
              setError(error);
              return;
          };

        setGallery(prev =>  [...prev, ...hits]);
        setTotalPages(Math.floor(totalHits / 12));
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
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
        {isLoading && <Loader />};
        {error && Notify.failure(`${error.message}`)};
        { gallery.length > 0 && <ImageGallery gallery={gallery} />}
        { gallery.length > 0 && page < totalPages && <Button onClick={loadMoreHandler}>Load more</Button>}
      </Container>
    );
};
