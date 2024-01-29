import axios from 'axios';

const API_KEY = '42026902-f9352e492811d87412855420c';
const BASE_URL = 'https://pixabay.com/api/';

async function retrieveImages(searchQuery = '', page = 1) {
  const response = await axios.get(
    `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response;
}
const ImageApi = {
  retrieveImages,
};
export default ImageApi;
