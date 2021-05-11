import './data';
import { populate, searchCities } from './display';
// Auto-Complete dropdown
async function dropDown() {
  const cities = await searchCities();
  const items = Array.from(document.querySelectorAll('.dropItem'));
  const list = document.getElementById('dropList');
  list.style.height = 'fit-content';
  // Remove previus cities
  const removeResults = () => {
    if (items.length !== 0) {
      items.map((item) => item.remove());
    }
  };
  // Populate with first 3 cities
  const firstCities = cities.slice(0, 3);
  firstCities.map((city) => {
    const drop = document.getElementById('dropList');
    const li = document.createElement('li');
    li.classList = 'dropItem';
    li.innerText = city;
    drop.appendChild(li);
  });
  // Display city search results on mouse enter and leave
  const showResults = () => {
    const input = document.getElementById('city');
    list.style.height = 'fit-content';
    input.addEventListener('mouseleave', () => {
      list.style.height = 'fit-content';
      input.style.borderRadius = '5px';
    });
    input.addEventListener('mouseenter', () => {
      list.style.height = 'fit-content';
      list.style.padding = '0';
    });
    list.addEventListener('mouseleave', () => {
      list.style.height = 'fit-content';
      list.style.paddingTop = '5px';
    });
    list.addEventListener('mouseenter', () => {
      list.style.height = 'fit-content';
      list.style.paddingTop = '5px';
    });
    // Select city from dropdown
    const searchResults = Array.from(document.querySelectorAll('.dropItem'));
    searchResults.map((city) => city.addEventListener('click', () => {
      populate(city.innerText);
      searchResults.map((item) => item.remove());
      list.style.height = '0';
      list.style.padding = '0';
      input.style.borderRadius = '5px';
    }));
  };
  return { removeResults, showResults };
}
export default dropDown;
