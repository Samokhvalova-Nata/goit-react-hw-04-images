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
    gallery: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
    })),
};
