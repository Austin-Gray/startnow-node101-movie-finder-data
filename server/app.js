const express  = require('express');
const morgan   = require('morgan');
const axios    = require('axios')
const app      = express();
let movieCache = {};
app.use(morgan('common'));
app.get('/', function(req, res) {
    const movieId = req.query;
    if (movieId.i) {
        if (movieCache[movieId.i]) {
            res.status(200).send(movieCache[movieId.i]);
        } else {
            axios.get('http://www.omdbapi.com/?i=' + encodeURIComponent(movieId.i) + '&apikey=8730e0e')
                .then((response) => {
                    movieCache[movieId.i] = response.data;
                    res.status(200).send(response.data);
            }); // .then(response...
        }; // else...
    } else if (movieId.t) {
        if (movieCache[movieId.t]) {
            res.status(200).send(movieCache[movieId.t]);
        } else {
            axios.get('http://www.omdbapi.com/?t=' + encodeURIComponent(movieId.t) + '&apikey=8730e0e')
                .then((response) => {
                    movieCache[movieId.t] = response.data;
                    res.status(200).send(response.data);
            }); // .then(response...
        }; // else...

    } else {
        res.send('You didn\'t search for anything');
    }
}); // app.get...


// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

module.exports = app;