import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '8567776-638120a8f010cc2219911b3d1';

export const fetchGalleryWithQuery = async (query, page) => {
    const searchParams = new URLSearchParams({
        q: query,
        page: page,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
    });

    const response = await axios.get(`${BASE_URL}?${searchParams}`);
    return response.data;
};
