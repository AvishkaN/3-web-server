const request = require("request");

const forecast = ({ latitude, longitude }, callback) => {
  request(
    {
      url:
        "http://api.weatherstack.com/current?access_key=af6c36e59a45f2665e12e37fc1da0857&query=" +
        latitude +
        "," +
        longitude,
      json: true,
    },
    (error, response) => {
      if (error) {
        callback(undefined, "unable to connect weather service");
      } else if (response?.body?.error) {
        callback(undefined, "unable to find location");
      } else {
        const { body } = response;
        callback(
          `${body.current.weather_descriptions[0]}. it is currently ${body?.current?.temperature} degrees out, It feels like ${body?.current?.feelslike} degrees out`,
          undefined
        );
      }
    }
  );
};

module.exports = {
  forecast,
};
