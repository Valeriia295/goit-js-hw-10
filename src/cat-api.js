import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_8ImzGgiix6ZQfAdvo37CwJCNWgE1AwfjPEeB62rcKRqh7FK2zr5mzzwJgezkjXQF';

export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds').then(response => {
    return response.data;
  });
}
export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      console.log(response);
      return response.data;
    });
}
