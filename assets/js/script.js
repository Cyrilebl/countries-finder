import { fetchData } from "./main.js";

// Update DOM with countries data

export function updateDOM(data) {
  // Clear previous results
  container.innerHTML = "";

  const startIndex = (currentPage - 1) * elementsPerPage;
  const endIndex = startIndex + elementsPerPage;
  const countriesToShow = data.slice(startIndex, endIndex);

  for (let i = 0; i < countriesToShow.length; i++) {
    const results = document.createElement("div");
    const anchorElement = document.createElement("a");
    const countryName = countriesToShow[i].name.common;
    anchorElement.href = `./details.html?country=${encodeURIComponent(
      countryName
    )}`;
    const resultsText = document.createElement("div");

    // Flag
    const resultImg = document.createElement("img");
    resultImg.src = countriesToShow[i].flags.png;
    resultImg.alt = countriesToShow[i].flags.alt;
    anchorElement.appendChild(resultImg);

    // Name
    const resultName = document.createElement("h2");
    resultName.innerText = countriesToShow[i].name.common;
    resultsText.appendChild(resultName);

    // Population
    const formattedPopulation = countriesToShow[i].population
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const resultPop = document.createElement("p");
    resultPop.innerHTML = `<strong>Population :</strong> ${formattedPopulation}`;
    resultsText.appendChild(resultPop);

    // Region
    const resultRegion = document.createElement("p");
    resultRegion.innerHTML = `<strong>Region :</strong> ${countriesToShow[i].region}`;
    resultsText.appendChild(resultRegion);

    // Capital
    const resultCapital = document.createElement("p");
    resultCapital.innerHTML = `<strong>Capital :</strong> ${countriesToShow[i].capital}`;
    resultsText.appendChild(resultCapital);

    container.appendChild(results);
    results.appendChild(anchorElement);
    anchorElement.appendChild(resultsText);
  }
  updatePagination();
}

export function updatePagination() {
  const paginationContainer = document.querySelector(".pagination");
  const totalPages = Math.ceil(countriesData.length / elementsPerPage);

  paginationContainer.innerHTML = "";

  const pages = document.createElement("p");
  pages.innerHTML = `<strong>Pages : </strong>`;
  paginationContainer.appendChild(pages);

  // Create pagination buttons
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;

    button.addEventListener("click", () => {
      currentPage = i;
      updateDOM(countriesData);
      window.scrollTo({ top: 0 });
    });
    if (i === currentPage) {
      button.classList.add("active");
    }
    paginationContainer.appendChild(button);
  }
}

fetchData()
  .then((data) => {
    countriesData = data;
    updateDOM(countriesData);
  })
  .catch((error) => {
    console.error("Error fetching country data:", error);
  });
