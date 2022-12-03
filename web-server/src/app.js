const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const weatherstack = require("./utils/weatherstack");

// define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "/templates/views");
const partialsPath = path.join(__dirname, "/templates/partials");

const app = express();

// for setting the app
// for hbs pages should in the folder called "src/views" - this is the default path, but we can configure it

// setup handle bar location and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Micheal",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Micheal",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "Micheal",
  });
});
app.get("/help/*", (req, res) => {
  //res.send('<p>Help pages not found !</p>');
  res.render("404", {
    title: "404 page",
    name: "Micheal",
    errorMessage: "Specific Help Page Not Found !!",
  });
});

// this is just for static pages
// but we dont want the static pages as they cannot change
// we want the dynamic pages based on the user input it should change
// setup static directory to server

// app.get('/', (req, res) => {
//     //res.send('<h1>Hello express !!</h1>');
//     res.send(index);
// });

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Andrew',
//         age: 45
//     },
//     {
//         name: 'Micheal',
//         age: 25
//     }
// ]);
// });
// app.get('/about', (req, res) => {
//     res.send('<h1>About Page !!</h1>');
// });
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide the address",
    });
  } else {
    geoCode(req.query.address, (error, data) => {
      if (error) {
        return res.send({
          error: error,
        });
      } else {
        weatherstack(
          data.latitude,
          data.longitude,
          "f",
          (error, forecastData) => {
            //console.log(error);
            if (error) {
                return res.send({
                    error: error,
                  });
            }
            res.send({
                forecast: forecastData,
                location: data.location,
                address: req.query.address,
              });

            console.log(forecastData);
            console.log(data.location);
          }
        );
      }
    });
  }

//   res.send({
//     forecast: "It is snowing",
//     location: "New York",
//     address: req.query.address,
//   });
});

// app.get('/products', (req, res) => {
//     // http://localhost:3000/products?search=games&rating=5
//     //console.log(req.query.search);
//     //console.log(req.query.rating);
//     if(!req.query.search){
//         return res.send({
//             error: "you must provid the search term"
//         });
//     }

//     res.send({
//         products: []
//     });
// });

app.get("*", (req, res) => {
  //res.send('<p>This is 404 page</p>');
  res.render("404", {
    title: "404 page",
    name: "Micheal",
    errorMessage: "Page Not Found !!",
  });
});
// app.com - is our domain
// app.com/help
// app.com/about

// to start the server
app.listen(3000, () => {
  console.log("Server is up on Port : 3000");
});
