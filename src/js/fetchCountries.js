import { Notify, Report, Confirm, Loading, Block } from "notiflix";
export default function fetchCountries (name) {
  const BASE_URL = 'https://restcountries.eu/';
  const service = 'name/';
  const Endpoints = `/rest/v2/${service}`;
  fetch(`${BASE_URL}${Endpoints}${name}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      const listContainer = document.querySelector( '.country-list' );
      const countryInfo = document.querySelector('.country-info');
      if (data.length > 10) {
        return Notify.info('Too many matches found. Please enter a more specific name.');
      } else if (data.length > 2 && data.length <= 10) {
        const nameList = data.map( ( item ) => {
          return `
          <li>
            <div class='flag-container'>
              <img src='${ item.flag }' alt='flag country' width='50'>
            </div>
            <h3>${ item.name }</h3>
          </li>
          `;

        } )
        countryInfo.innerHTML = '';
        listContainer.innerHTML = nameList.join( '' );

      } else {
        const selfCountry = data.map((country) => {
          return`
            <h2>${country.name}</h2>
            <div class='flag-country'>
              <img src='${country.flag}' alt='flag country' width='100'>
            </div>
            <h3><strong>Capital: </strong>${country.capital}</h3>
            <p class='population'><strong>Population: </strong>${country.population}</p>
            <div class='languages-country'>
              <strong>Languages: </strong>
              <ul>
                  ${
                  country.languages.map((language)=> {
                    return `<li>${language.name}</li>`;
                  })
                }
            </ul>
          </div>

          `;
        })

        listContainer.innerHTML = '';
        countryInfo.innerHTML = selfCountry.join('');
      }

      // }
      // data handling
    })
    .catch(error => {
      return Notify.failure('Oops, there is no country with that name');
      // error handling
    });
}


