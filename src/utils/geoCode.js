const request = require("request");

const getCode = (address = "log angeles", callback) => {
  request(
    {
      url: `http://nominatim.openstreetmap.org/search/${address}?format=json`,
      json: true,
    },
    (error, response) => {
      if (error) {
        callback(undefined, "unable to connect map service");
      } else if (!response.body.length) {
        callback(undefined, "unable to find location. try another search");
      } else {
        const { body } = response;

        callback(
          {
            longitude: body[0].lon,
            latitude: body[0].lat,
            display_name: body[0]?.display_name,
          },
          undefined
        );
      }
    }
  );
};

module.exports = {
  getCode: getCode,
};
