import './sass/main.scss';
import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 500;
const enterNameCountry = document.getElementById('search-box');
if(enterNameCountry) {
  enterNameCountry.addEventListener('input', debounce(searchQuery, DEBOUNCE_DELAY))
}

function searchQuery(e) {
    fetchCountries(e.target.value.trim());
}

