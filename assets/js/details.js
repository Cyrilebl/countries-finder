import { fetchDataByName } from "./main.js";

function updateDOM(data) {
  const container = document.querySelector(".country-details");
  container.innerHTML = "";

  const flagImg = document.createElement("div");

  const text = document.createElement("div");
  text.classList.add("text");

  const title = document.createElement("div");
  title.classList.add("text_title");
  const left = document.createElement("div");
  left.classList.add("text_left");
  const right = document.createElement("div");
  right.classList.add("text_right");
  const bottom = document.createElement("div");
  bottom.classList.add("text_bottom");

  // Flag
  const image = document.createElement("img");
  image.src = data[0].flags.png;
  image.alt = data[0].flags.alt;
  flagImg.appendChild(image);

  // Name
  const name = document.createElement("h2");
  name.innerText = data[0].name.common;
  title.appendChild(name);

  // Native name
  const nativeName = document.createElement("p");
  nativeName.innerHTML = `<strong>Native Name :</strong> ${data[0].name.official}`;
  left.appendChild(nativeName);

  // Population
  const formattedPopulation = data[0].population
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const population = document.createElement("p");
  population.innerHTML = `<strong>Population :</strong> ${formattedPopulation}`;
  left.appendChild(population);

  // Region
  const region = document.createElement("p");
  region.innerHTML = `<strong>Region :</strong> ${data[0].region}`;
  left.appendChild(region);

  // Sub Region
  const subRegion = document.createElement("p");
  subRegion.innerHTML = `<strong>Sub Region :</strong> ${data[0].subregion}`;
  left.appendChild(subRegion);

  // Capital
  const capital = document.createElement("p");
  capital.innerHTML = `<strong>Capital :</strong> ${data[0].capital}`;
  left.appendChild(capital);

  // Top Level Domain
  const topLvlDomain = document.createElement("p");
  topLvlDomain.innerHTML = `<strong>Top Level Domain :</strong> ${data[0].tld}`;
  right.appendChild(topLvlDomain);

  // Currencies
  const currencies = document.createElement("p");
  const currencyObjs = data[0].currencies;

  let currencyNames = [];

  // Iterate over each currency object and extract the currency names
  for (const key in currencyObjs) {
    if (Object.hasOwnProperty.call(currencyObjs, key)) {
      currencyNames.push(currencyObjs[key].name);
    }
  }
  const cleanCurrencyNames = currencyNames.join(", ");
  currencies.innerHTML = `<strong>Currencies :</strong> ${cleanCurrencyNames}`;
  right.appendChild(currencies);

  // Languages
  const languages = document.createElement("p");
  const languageObjs = data[0].languages;

  let languageNames = [];

  // Iterate over each language object and extract the language names
  for (const key in languageObjs) {
    if (Object.hasOwnProperty.call(languageObjs, key)) {
      languageNames.push(languageObjs[key]);
    }
  }
  const cleanLanguageNames = languageNames
    .map((name) => name.replace(/"/g, ""))
    .join(", ");
  languages.innerHTML = `<strong>Languages :</strong> ${cleanLanguageNames}`;
  right.appendChild(languages);

  // Borders

  const borders = data[0].borders;
  const borderContainer = document.createElement("div");
  const borderTitle = document.createElement("p");
  borderTitle.innerHTML = `<strong>Border Countries : </strong>`;
  if (borders && borders.length > 0) {
    displayBorderCountries(borders, borderContainer);
  } else {
    const noBordersMessage = document.createElement("p");
    noBordersMessage.textContent = "This country might be an island.";
    borderContainer.appendChild(noBordersMessage);
  }
  bottom.appendChild(borderTitle);
  bottom.appendChild(borderContainer);

  container.appendChild(flagImg);
  container.appendChild(text);
  text.appendChild(title);
  text.appendChild(left);
  text.appendChild(right);
  text.appendChild(bottom);
}

const urlParams = new URLSearchParams(window.location.search);
const countryName = urlParams.get("country");

fetchDataByName(countryName)
  .then((data) => {
    updateDOM(data);
  })
  .catch((error) => {
    console.error("Error fetching country data:", error);
  });

// Borders

// Fetch full name of a country using its country code
async function getCountryName(countryCode) {
  const response = await fetch(
    `https://restcountries.com/v3/alpha/${countryCode}`
  );
  const data = await response.json();
  return data[0].name.common;
}

// Fetch and display full names of bordering countries
async function displayBorderCountries(borders, borderContainer) {
  for (const border of borders) {
    const fullName = await getCountryName(border);
    const borderButton = document.createElement("button");
    borderButton.textContent = fullName;

    borderButton.addEventListener("click", function () {
      fetchDataByName(fullName).then((data) => {
        updateDOM(data);
      });
    });
    borderContainer.appendChild(borderButton);
  }
}
