/* eslint-disable no-return-assign */
import { getData, getHourly } from './data';
import dropDown from './dropdown';

function searchCities() {
  const city = document.getElementById('city').value;
  return getData(city).then((d) => d.getCityArray());
}
// Populate section
async function todayPrint(city) {
  // Select each input
  const cityName = document.getElementById('cityName');
  const temp = document.getElementById('temp');
  const icon = document.getElementById('icon');
  const feel = document.getElementById('feel');
  const description = document.getElementById('description');
  const snow = document.getElementById('snow');
  const rain = document.getElementById('rain');
  const press = document.getElementById('press');
  const deg = document.getElementById('deg');
  const speed = document.getElementById('speed');
  const humi = document.getElementById('humi');
  const min = document.getElementById('min');
  const max = document.getElementById('max');
  // Set city name
  cityName.innerText = city;
  // Get the correct data
  const data = await getData(cityName.innerText);
  // Set inputs with correct values and units (metric)
  temp.innerText = `${data.getDetails(0).temp}°`;
  icon.src = data.getIconUrl(0);
  feel.innerText = `Feels like: ${data.getDetails(0).feels_like}°`;
  description.innerText = data.getWeather(0).description;
  snow.innerText = `${data.getSnow(0)}mm/h`;
  rain.innerText = `${data.getRain(0)[0]}mm/h`;
  press.innerText = `${data.getDetails(0).pressure}hPa`;
  deg.innerText = data.getWind(0).deg;
  speed.innerText = `${data.getWind(0).speed}m/s`;
  humi.innerText = `${data.getDetails(0).humidity}%`;
  min.innerText = `${data.getDetails(0).temp_min}°`;
  max.innerText = `${data.getDetails(0).temp_max}°`;
}
// Input eventListener activates auto-dropdown
const input = document.getElementById('city');
input.addEventListener('input', () => {
  dropDown().then((e) => e.showResults());
});
async function headerDriver(city) {
  const data = await getHourly(city);
  // Get unique days
  const days = data.map((item) => item.day());
  const setDays = Array.from(new Set([...days])).sort();
  // Get unique hours
  const hours = data.map((item) => item.hour());
  const setHours = Array.from(new Set([...hours])).sort();
  return { setDays, setHours, data };
}
// Set table id's to receive the matching objects
async function setTable(city) {
  const driver = await headerDriver(city);
  // Get days row
  const colDays = Array.from(document.querySelectorAll('.tg-0lax-h'));
  const colId = driver.setDays;
  // Get hours column
  const rowHours = Array.from(document.querySelectorAll('.tg-0lax-0'));
  const rowId = driver.setHours.map((item) => item.slice(0, 2));
  // Get table body icon elements
  const setIcon = () => {
    const icons = Array.from(document.querySelectorAll('.tg-icon'));
    // Set icon's id's
    let i = 0;
    let j = 0;
    icons.forEach((item) => {
      if (j < colId.length) {
        item.id = `i${rowId[i]}x${colId[j]}`;
        j += 1;
      } else {
        j = 0;
        i += 1;
        item.id = `i${rowId[i]}x${colId[j]}`;
        j = 1;
      }
    });
    return icons;
  };
  // Get table body temp elements
  const setTemp = () => {
    const temp = Array.from(document.querySelectorAll('.tg-temp'));
    // Set temperature's id's
    let i = 0;
    let j = 0;
    temp.forEach((item) => {
      if (j < colId.length) {
        item.id = `t${rowId[i]}x${colId[j]}`;
        j += 1;
      } else {
        j = 0;
        i += 1;
        item.id = `t${rowId[i]}x${colId[j]}`;
        j = 1;
      }
    });
    return temp;
  };
  const setRain = () => {
    const rain = Array.from(document.querySelectorAll('.tg-rain'));
    // Set rain's id's
    let i = 0;
    let j = 0;
    rain.forEach((item) => {
      if (j < colId.length) {
        item.id = `r${rowId[i]}x${colId[j]}`;
        j += 1;
      } else {
        j = 0;
        i += 1;
        item.id = `r${rowId[i]}x${colId[j]}`;
        j = 1;
      }
    });
    return rain;
  };
  return {
    rowHours, colDays, setIcon, setTemp, setRain,
  };
}
async function forecastPrint(city) {
  const driver = await headerDriver(city);
  const tableSet = await setTable(city);
  const days = driver.setDays;
  const hours = driver.setHours;
  // Print hours and days headers
  tableSet.rowHours.map((item, index) => item.innerText = hours[index]);
  tableSet.colDays.map((item, index) => item.innerText = days[index]);
  // Set Id's
  tableSet.setIcon();
  tableSet.setTemp();
  tableSet.setRain();
  // Print info
  driver.data.map((item) => {
    const icon = document.getElementById(`i${item.id()}`);
    const temp = document.getElementById(`t${item.id()}`);
    const rain = document.getElementById(`r${item.id()}`);
    icon.src = item.icon();
    temp.innerText = `${item.temp}°`;
    rain.innerText = item.rain() === '' ? '' : `Rain: ${item.rain()}mm/h`;
  });
}

export { todayPrint, searchCities, forecastPrint };
