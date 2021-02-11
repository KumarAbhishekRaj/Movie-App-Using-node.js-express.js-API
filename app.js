const { query } = require('express');
const express = require('express');
const app = express();
const path = require('path');
const request = require('request');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/results', (req, res) => {

    let query = req.query.search;

    request('https://api.themoviedb.org/3/search/movie?api_key=4d7041b445493a3d8d2f75802ef4c7a2&query=' + query, (error, response, body) => {
        if (error) {
            console.log(error)
        }
        let data = JSON.parse(body);
        data.results.forEach((value, index) => {
            data.results[index]['poster_path'] = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${value['poster_path']}`;
        })
        res.render('movies', { data: data, searchQuery: query });

    })
})
app.get('/search', (req, res) => {
    res.render('search')
})



app.listen(4000, () => {
    console.log('port is running at 4000')
})