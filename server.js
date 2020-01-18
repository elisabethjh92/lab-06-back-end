'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT;
const app = express();
app.use(cors());

app.get('/', (request, response) => {
  response.send('This still works!');
});

app.get('/location', (request, response) => {
  try {
    const geoData = require('./data/geo.json');
    const city = request.query.city;
    const locationData = new Location (city, geoData);
    response.send(locationData);
  }
  catch(error) {
    errorHandler('So sorry, something went wrong.', request, response);
  }
});

function errorHandler(error, request, response) {
  response.status(500).send(error);
}

function Location(city, geoData){
  this.search_query = city;
  this.formatted_query = geoData[0].display_name;
  this.latitude = geoData[0].lat;
  this.longitude = geoData[0].lon;
}




app.listen(PORT, () => console.log(`Server up on port ${PORT}`));

