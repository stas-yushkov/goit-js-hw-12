import './css/styles.css';

import debounce from 'lodash.debounce';

const inputRef = document.querySelector('input#search-box');

const DEBOUNCE_DELAY = 300;
const MAX_LENGTH = 10;

inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const searchQuery = e.target.value.trim();

  if (searchQuery === '') {
    console.log('searchQuery must not be empty or just spaces');
    return;
  }

  console.log(searchQuery);
  fetchCountry(searchQuery);
}

function fetchCountry(countryName) {
  return fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
    .then(res => {
      console.log(res);
      return res.json();
    })
    .then(data => {
      console.log(data);

      return data;
    })
    .then(data => {
      if (data.length > MAX_LENGTH) {
        console.log('Result is so large... Specify the searchQuery');
        return data;
      }
    });
}
