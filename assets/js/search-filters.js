import { fetchData, fetchDataByName } from "./main.js";
import { updateDOM, updatePagination } from "./script.js";

// Search Countries by Name

const input = document.getElementById("text_input");

input.addEventListener("input", () => {
  const countryName = input.value.trim();
  const errorMessage = document.querySelector(".errorMessage");
  if (countryName === "") {
    errorMessage.textContent = "";
    return;
  }
  fetchDataByName(countryName)
    .then((data) => {
      updateDOM(data);
    })
    .catch((error) => {
      console.error("Error fetching country data:", error);
      errorMessage.textContent = "Country not found";
    });
});

// Filters & Sorts

fetchData()
  .then((data) => {
    countriesData = data;
    filters(countriesData);
    sorts(countriesData);
  })
  .catch((error) => {
    console.error("Error fetching country data:", error);
  });

function filters(data) {
  const regionFilter = document.getElementById("regions");

  regionFilter.addEventListener("change", function () {
    const selectedValue = regionFilter.value;

    if (selectedValue === "") {
      // Reset the filter by updating countriesData with the original unfiltered data
      countriesData = [...data];
      updatePagination();
      currentPage = 1;
      updateDOM(countriesData.slice(0, elementsPerPage));
      return;
    }
    container.innerHTML = "";

    const selectedRegion = regionFilter.value;
    const filteredCountries = data.filter(
      (country) => country.region === selectedRegion
    );
    // Update countriesData with the filtered data
    countriesData = filteredCountries;

    // Update pagination after filtering
    updatePagination();

    // Update the DOM with the first page of filtered data
    currentPage = 1;
    updateDOM(countriesData.slice(0, elementsPerPage));
  });
}

function sorts(data) {
  const sort = document.getElementById("sort");

  sort.addEventListener("change", function () {
    container.innerHTML = "";

    const countriesOrder = Array.from(data);
    if (sort.value === "asc") {
      countriesOrder.sort((a, b) => {
        return a.name.common.localeCompare(b.name.common);
      });
    } else if (sort.value === "desc") {
      countriesOrder.sort((a, b) => {
        return b.name.common.localeCompare(a.name.common);
      });
    } else if (sort.value === "descPop") {
      countriesOrder.sort((a, b) => {
        return b.population - a.population;
      });
    } else if (sort.value === "ascPop") {
      countriesOrder.sort((a, b) => {
        return a.population - b.population;
      });
    }
    // Update countriesData with the filtered data
    countriesData = countriesOrder;

    // Update pagination after filtering
    updatePagination();
    // Update the DOM with the first page of filtered data
    currentPage = 1;
    updateDOM(countriesOrder.slice(0, elementsPerPage));
  });
}
