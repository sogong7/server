const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
var axios = require("axios").default;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "database-2.crmeil0mqyyf.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "mypassword",
  port: "3306",
  database: "management",
});
connection.connect();

var options = {
  method: "GET",
  url: "https://ott-details.p.rapidapi.com/advancedsearch",
  params: {
    start_year: "1970",
    end_year: "2020",
    min_imdb: "6",
    max_imdb: "7.8",
    genre: "action",
    language: "english",
    type: "movie",
    sort: "latest",
    page: "1",
  },
  headers: {
    "x-rapidapi-host": "ott-details.p.rapidapi.com",
    "x-rapidapi-key": "7c1c27a5b4msh9043c7fd8d0acc0p18fa7ejsn189151ac97e1",
  },
};

var popular_api_options = {
  method: "GET",
  url: "https://movies-tvshows-data-imdb.p.rapidapi.com/",
  params: { type: "get-popular-movies", page: "1", year: "2020" },
  headers: {
    "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com",
    "x-rapidapi-key": "7c1c27a5b4msh9043c7fd8d0acc0p18fa7ejsn189151ac97e1",
  },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });

app.get("/api/recommend", (req, res) => {
  /* TODO: 추천 결과 정보 */
  connection.query("SELECT * FROM CUSTOMER", (err, rows, fileds) => {
    res.send(rows);
  });
});

app.get("/api/top10", (req, res) => {
  /* https://rapidapi.com/amrelrafie/api/movies-tvshows-data-imdb/ */
  /* TODO: 인기있는 영화 TOP10 정보 */
  try {
  } catch (error) {
    console.error("🤬 삐빕!");
  }
  connection.query("SELECT * FROM CUSTOMER", (err, rows, fileds) => {
    res.send(rows);
  });
});

app.get("/api/detail/{movieId}", (req, res) => {
  /* TODO: 영상 상세 정보 */
  connection.query("SELECT * FROM CUSTOMER", (err, rows, fileds) => {
    res.send(rows);
  });
});
