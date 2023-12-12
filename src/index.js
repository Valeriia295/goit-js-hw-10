import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import '/node_modules/slim-select/dist/slimselect.css';

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('p.error');
const catInfo = document.querySelector('.cat-info');
const body = document.querySelector('body');

error.setAttribute('hidden', 'true');
loader.setAttribute('hidden', 'true');
select.setAttribute('hidden', 'true');

body.insertAdjacentHTML(
  'beforeend',
  `<div class = "loader-container"><span class="customLoader"></span></div>`
);
const customLoader = document.querySelector('div.loader-container');
fetchBreeds()
  .then(breeds => {
    const markup = breeds
      .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
      .join('');
    select.insertAdjacentHTML('beforeend', markup);
    new SlimSelect({
      select: 'select.breed-select',
    });
    select.removeAttribute('hidden');
    customLoader.remove();
  })
  .catch(error => {
    Notiflix.Notify.failure(`Error ${error}`);
    customLoader.remove();
  });

select.addEventListener('change', event => {
  body.insertAdjacentHTML(
    'beforeend',
    `<div class = "loader-container"><span class="customLoader"></span></div>`
  );
  catInfo.innerHTML = '';
  const customLoader = document.querySelector('div.loader-container');
  const value = select.value;
  fetchCatByBreed(value)
    .then(data => {
      const picture = data[0].url;
      const description = data[0].breeds[0].description;
      const temperament = data[0].breeds[0].temperament;
      const name = data[0].breeds[0].name;

      const markup = `<div style = 'display: flex; gap:20px; margin-top: 20px;'>
    <img src = ${picture} alt = ${value} width='450px' />
    <div>
    <h1>${name}</h1><p>${description}</p><p><b>Temperament: </b>${temperament}</p>
    </div>
    </div>`;
      catInfo.insertAdjacentHTML('afterbegin', markup);
      customLoader.remove();
    })
    .catch(error => {
      Notiflix.Notify.failure(`Error ${error}`);
      customLoader.remove();
    });
});
