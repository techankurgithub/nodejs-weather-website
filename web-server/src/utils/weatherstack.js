const request = require('request');

const weatherstack = (longitute, latitude, units, callback) => {
    const url =
      "http://api.weatherstack.com/current?access_key=3dd945f7921f2252cbf033a256e7fe75&query=" +
      encodeURIComponent(longitute) + "," + encodeURIComponent(latitude) +
      "&units="+units;
  
    request(
      {
        url: url,
        json: true,
      },
      (error, response) => {
        if (error) {
          // low level fail
          //console.log("Unable to connect to Weather API !!");
          callback('Unable to connect to Weather API !!');
        } else if (response.body.error) {
          // fail in the response due to some other error, but the service is up and running and hitting properly
          //console.log(response.body.error);
          callback(response.body.error);
        } else {
          //console.log(error);
          // console.log(
          //   response.body.current.weather_descriptions[0] +
          //     ". Its currently " +
          //     response.body.current.temperature +
          //     " degree celcius. But it feels like " +
          //     response.body.current.feelslike +
          //     " degree celcius"
          // );
          const data = response.body.current.weather_descriptions[0] +
              ". Its currently " +
              response.body.current.temperature +
              " degree celcius. But it feels like " +
              response.body.current.feelslike +
              " degree celcius";
          callback(undefined, data);
        }
      }
    );
  };

  module.exports = weatherstack;