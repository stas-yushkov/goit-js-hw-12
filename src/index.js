import './css/styles.css';

import debounce from 'lodash.debounce';

const inputRef = document.querySelector('input#search-box');

const DEBOUNCE_DELAY = 300;
const MAX_LENGTH = 10;

inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

// onInput();

function onInput(e) {
  const searchQuery = e.target.value.trim();
  // const searchQuery = 'belar';

  if (searchQuery === '') {
    console.log('searchQuery must not be empty or just spaces');
    return;
  }

  console.log('searchQuery: ', searchQuery);
  fetchCountry(searchQuery)
    .then(data => {
      if (data.length > MAX_LENGTH) {
        console.log('Result is so large... Specify the searchQuery');
        return;
      }
      if (data.length === 1) {
        const { name, flag, capital, population, languages } = data[0];

        const languagesNames = languages.map(lang => lang.name);

        // console.table(languages);

        // console.log('languagesNames: ', languagesNames);

        console.log('data.length === 1');
        console.log(flag, name, capital, population, languagesNames);
        return name;
      }

      data.forEach(({ flag, name }) => {
        console.log(flag, name);
      });
      return data;
    })
    .catch(error => {
      console.log('error: ', error);
      console.log('error.message: ', error.message);
      console.dir(error);
    });
}

function fetchCountry(countryName) {
  return fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
    .then(res => {
      console.log('res: ', res);

      if (res.status !== 200) {
        throw new Error(404);
        // return;
      }
      return res.json();
    })
    .then(data => {
      console.log('data: ', data);

      return data;
    });
}
