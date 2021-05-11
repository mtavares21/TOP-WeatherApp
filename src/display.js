import getData from './data';
import dropDown from './dropdown';

function searchCities() {
  const city = document.getElementById('city').value;
  return getData(city).then((d) => d.getCityArray());
}
// Populate section
async function populate(city) {
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
  dropDown().then((v) => {
    v.removeResults();
    v.showResults();
  });
});
populate('Lisbon, PT');
export { populate, searchCities };
