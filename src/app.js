const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();

const { getCode } = require("./utils/geoCode");
const { forecast } = require("./utils/forecast");

// define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templete/views");
const partialPath = path.join(__dirname, "../templete/partials");

// setup handlerbars engine views location
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather",
    name: "av nirmitha",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about page",
    name: "av nirmitha",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help page",
    name: "av nirmitha",
    msg: "Our goal is helping others ",
  });
});

// app.get("", (req, res) => {
//   res.send("hello express");
// });

// app.get("/help", (req, res) => {
//   res.send("help page");
// });

// app.get("/about", (req, res) => {
//   res.send("<h1> About page </h1>");
// });

// app.get("/weather", (req, res) => {
//   res.send({
//     forecast: "",
//     location: "",
//   });
// });

app.get("/weather", (req, res) => {
  console.log(req.query.address);

  const userInputCity = req.query.address;

  if (!userInputCity) {
    return res.send({
      error: "error ",
    });
  }

  // get cords
  getCode(
    userInputCity,
    ({ latitude, longitude, display_name } = {}, error) => {
      if (error) {
        return res.send({
          error: error,
        });
      }

      // get weather information
      forecast({ latitude, longitude, display_name }, (data, error) => {
        if (error) {
          return res.send({
            error: error,
          });
        }

        console.log(display_name);
        // console.log("data", data);

        res.send({
          forecast: data,
          location: display_name,
          address: userInputCity,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Page",
    errorMsg: "help article not found",
    name: "av nirmitha",
  });
});

app.get("/products", (req, res) => {
  console.log(req.query.search);

  if (!req.query.search) {
    return res.send({
      error: "error ",
    });
  }
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 page",
    errorMsg: "page not fount ",
    name: "av nirmitha",
  });
});

app.listen(3000, () => {
  console.log("server up is up on port 3000");
});
