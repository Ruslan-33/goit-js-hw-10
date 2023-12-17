// 'api_key=live_wMMINRcPVmQ0c2wnNgGkIUsecF4RIUoZpD8ug3nMWeDRwHmRIMLUsNXRaWPhaglr';

import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
export { selectors };
// import 'animate.css';

const selectors = {
  select: document.querySelector('.breed-select'),
  body: document.querySelector('body'),
  window: document.querySelector('window'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  info: document.querySelector('.cat-info'),
};
selectors.loader.style.display = 'block';
selectors.select.style.display = 'none';

selectors.select.addEventListener('change', onChange);

fetchBreeds().then(breeds => {
  const cats = breeds
    .map(
      ({ id, name }) => `
    <option value=${id}>${name}</option>
    `
    )
    .join('');
  selectors.select.insertAdjacentHTML('beforeend', cats);
  selectors.select.style.display = 'block';
  selectors.loader.style.display = 'none';
});

function onChange(e) {
  selectors.loader.style.display = 'block';
  selectors.info.style.display = 'none';

  fetchCatByBreed(`${selectors.select.value}`)
    .then(cat => {
      const image = cat[0].url;
      const name = cat[0].breeds[0].name;
      const description = cat[0].breeds[0].description;
      const temperament = cat[0].breeds[0].temperament;

      const catInfo = `
        <img class="cat-image animate__animated animate__jackInTheBox" src=${image} width="500">
        <h1 align="center" class="">${name}</h2>
        <h2>Temperament:</h2><p>${temperament}</p>
        <h2>Description</h2><p>${description}</p>
        `;
      selectors.info.innerHTML = catInfo;
      selectors.info.style.display = 'block';
      selectors.loader.style.display = 'none';
    })
    .catch(error => {
      Notiflix.Report.failure('Something went wrong', String(error), 'OK');
      selectors.loader.style.display = 'none';
    });
}
