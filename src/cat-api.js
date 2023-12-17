import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_Yt50XPXfRGvu0pgFUsmjRtla5ppBKDqX0fVcX0925gWUaLlx4MISYIaZc0goVKno';
export { fetchBreeds, fetchCatByBreed };

const API_KEY =
  '&api_key=live_wMMINRcPVmQ0c2wnNgGkIUsecF4RIUoZpD8ug3nMWeDRwHmRIMLUsNXRaWPhaglr';

function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw new Error('smth went wrong' + error);
    });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(cat => cat.data);
}
