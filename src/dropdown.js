import './data';
import { forecastPrint, todayPrint, searchCities } from './display';

// Auto-Complete dropdown
async function dropDown() {
  const cities = await searchCities();
  const input = document.getElementById('city');
  const dropList = document.getElementById('dropList');
  const dropContainer = document.getElementById('dropNav');
  // Populate with first 3 cities
  const firstCities = typeof cities === 'object' && cities.length ? cities.slice(0, 3) : null;

  // Remove curr cities from list
  const removeResults = () => {
    const currCities = Array.from(document.querySelectorAll('.dropItem'));
    currCities.map((item) => item.remove());
    dropList.style.display = 'none';
  };
  removeResults();

  // Clean list if click outside
  window.addEventListener('click', (e) => {
    if (e.target !== dropContainer) {
      input.value = '';
      removeResults();
    }
  }, { once: true });

  // Create list item
  const createLi = (text) => {
    const li = document.createElement('li');
    li.classList = 'dropItem';
    li.innerText = text;
    dropList.appendChild(li);
  };

  // Fill dropList with first 3 cities
  if (firstCities) {
    firstCities.map((city) => {
      createLi(city);
      dropList.style.display = 'flex';
    });
  } else if (input.value.length) {
    createLi('Sorry, no results.');
    dropList.style.display = 'flex';
  }
  // Display city search results on mouse enter and leave
  const showResults = () => {
    // Select city from dropdown
    const searchResults = Array.from(document.querySelectorAll('.dropItem'));
    searchResults.map((city) => city.addEventListener('click', () => {
      todayPrint(city.innerText);
      forecastPrint(city.innerText);
      // Clean-up
      input.value = '';
      removeResults();
    }));
  };
  return { showResults };
}
export default dropDown;
