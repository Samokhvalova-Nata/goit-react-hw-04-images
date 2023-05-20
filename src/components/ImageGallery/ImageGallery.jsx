import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ gallery }) => {
    return (
        <Gallery>
            {gallery.map(({ id, webformatURL, tags, largeImageURL }) => (
                <ImageGalleryItem
                    key={id}
                    url={webformatURL}
                    alt={tags}
                    largeImage={largeImageURL}
                />
            ))}
        </Gallery>
    );
};

ImageGallery.propTypes = {
    gallery: PropTypes.array.isRequired,
};

// export const ImageGallery = ({ query }) => {
//     const [gallery, setGallery] = useState([]);
//     const [error, setError] = useState(null);
//     const [status, setStatus] = useState('idle');
//     const [page, setPage] = useState(1);


//     useEffect(() => {
//         async function fetchImages() {
//             setStatus('pending');
//             setPage(1);

//             try {
//                 const { hits, total } = await fetchGalleryWithQuery(query, 1);

//                 if (total === 0) {
//                     const error = new Error('Sorry, there are no images matching your search query.')
//                     setStatus('rejected');
//                     setError(error);
//                     return;
//                 };

//                 setGallery(hits);
//                 setStatus('resolved');
//                 setPage(prev => prev + 1);
//             } catch (error) {
//                 setStatus('rejected');
//                 setError(error);
//             };
//         };

//         if(query) fetchImages();
        
//     }, [query]);

//     const loadMoreHandler = async () => { 
//         try {
//             const { hits } = await fetchGalleryWithQuery(query, page);
//             setGallery(prev => [...prev, ...hits]);
//             setPage(prev => prev + 1);
//         } catch (error) {
//             setStatus('rejected');
//             setError(error);
//         };
//     };

//         if (status === 'pending') {
//             return <Loader/>
//         };

//         if (status === 'rejected') {
//             Notify.failure(`${error.message}`)
//             return;
//         };

//         if (status === 'resolved') {
//             return <>
//                     <Gallery>
//                     {gallery.map(({ id, webformatURL, tags, largeImageURL }) => (
//                         <ImageGalleryItem
//                             key={id}
//                             url={webformatURL}
//                             alt={tags}
//                             largeImage={largeImageURL}
//                         />
//                     ))}
//                     </Gallery>
//                     <Button onClick={loadMoreHandler}>Load more</Button>
//             </>
//         };
// };