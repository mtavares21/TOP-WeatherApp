// Get data from openWeather API and return it
// Input (string): city and unit(imperial, metric)
async function getData(city, unit) {
  let data = 'init';
  if (!unit) {
    unit = 'metric';
  }
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/find?q=${city}&appid=f17f1947420bddfefeaa03f982991c57&units=${unit}`,
      {
        mode: 'cors',
      },
    );
    data = await response.json();
  } catch (err) {
    console.log(err.message);
  }
  // list of city and country
  function getCityArray() {
    if (data.list.length > 0) {
      const cities = data.list.map(
        (item) => `${item.name}, ${item.sys.country}`,
      );
      return cities;
    }
    return 'Sorry, cant find this city.';
  }
  // get weather: main, description,  icon
  function getWeather(index) {
    return data.list[index].weather[0];
  }
  // getWind
  function getWind(index) {
    return data.list[index].wind;
  }
  // getSnow
  function getSnow(index) {
    return data.list[index].snow ? data.list[index].snow[0] : '0';
  }
  // getWind
  function getRain(index) {
    return data.list[index].rain ? data.list[index].rain[0] : '0';
  }
  // get details: feels_like, humidity, pressure,temp,temp_max,temp_min
  function getDetails(index) {
    return data.list[index].main;
  }
  // get icon  `http://openweathermap.org/img/wn/${w.icon}d@2x.png`
  function getIconUrl(index) {
    return `http://openweathermap.org/img/wn/${data.list[index].weather[0].icon}@2x.png`;
  }
  return {
    getCityArray,
    getWeather,
    getWind,
    getDetails,
    getIconUrl,
    getSnow,
    getRain,
  };
}

async function getHourly() {
  const response = await fetch(
    'https://api.openweathermap.org/data/2.5/forecast?q=london&appid=f17f1947420bddfefeaa03f982991c57',
  );
  const data = await response.json();
  console.log(data);
  const hours = data.list.map((item) => item.dt_txt);
  console.log(hours);
  const icon = data.list.map(
    (item) => `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
  );  
  console.log({icon});
}
getHourly();
/*
getData('santarem').then((e) => Promise.all([
  e.getIconUrl(0),
  e.getRain(0),
  e.getSnow(0),
  e.getWeather(0),
  e.getDetails(0),
  e.getWind(0),
])).then((array) => array);
*/
export default getData;
