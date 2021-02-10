const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

const corsOption = {
  origin: '*',
  optionsSuccessStatus: 200
};

const handleInformation = async (req, res) => {
  console.log(req.query);
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3${req.path}`,
      {
        params: {
          ...req.query,
          api_key: process.env.API_KEY,
        },
      }
    );
    res.send(data);
  } catch (err) {
    console.log(err.message());
    res.status(404).send({ message: 'Data is not available' });
  }
};

app.use(cors(corsOption));
app.use((req, res, next) => {
  res.setHeader('X-Powered-By', 'Odeon by Bibek');
  next();
});

app.get('/trending/movie/day', handleInformation);
app.get('/movie/popular', handleInformation);
app.get('movie/top_rated', handleInformation);
app.get('/discover/movie', handleInformation);

app.get('/trending/tv/day', handleInformation);
app.get('/tv/popular', handleInformation);
app.get('/tv/top_rated', handleInformation);
app.get('/discover/tv', handleInformation);

app.get('/search/multi', handleInformation);

app.get('/movie/:id', handleInformation);
app.get('/person/:id', handleInformation);
app.get('/tv/:id', handleInformation);

module.exports.handler = serverless(app);
