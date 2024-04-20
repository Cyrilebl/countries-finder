export async function fetchData() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all/");
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchDataByName(countryName) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
