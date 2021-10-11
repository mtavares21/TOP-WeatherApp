// Get data from openWeather API and return it
// Input (string): city and unit(imperial, metric)
async function getData(city, unit) {
  let data;
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
    return err.status;
  }
  // list of city and country
  function getCityArray() {
    if (!!data.list) {
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
// Data for 'Forecast' table (call OpenWeather hourly API)
async function getHourly(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=f17f1947420bddfefeaa03f982991c57`,
  );
  const data = await response.json();
  // Factory function with the objects for each table position
  function tbFactory(index, dt_text, item) {
    // Design a prototype for the table content
    const tbProto = {
      id: function setId() {
        return `${this.date.slice(11, 13)}x${this.date.slice(8, 10)}`;
      },
      date: '2021-05-11 03:00:00',
      currItem: { rain: { '3h': 13 } },
      day: function getDay() {
        return this.date.slice(8, 10);
      },
      hour: function getHour() {
        return this.date.slice(11, 16);
      },
      icon: function getIcon() {
        return `http://openweathermap.org/img/wn/${this.currItem.weather[0].icon}@2x.png`;
      },
      rain: function getRain() {
        return this.currItem.rain ? Math.round(parseFloat(this.currItem.rain['3h']) / 3 * 100) / 100 : '';
      },
    };
    return Object.assign(Object.create(tbProto), {
      date: dt_text,
      currItem: item,
      temp: item.main.temp,
    });
  }
  // Get array of table objects
  const tableObjects = data.list.map((_item, index) => tbFactory(index, _item.dt_txt, _item));
  return tableObjects;
}
export { getData, getHourly };
