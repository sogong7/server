const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
const axios = require("axios").default;

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

app.get("/", (req, res) => {
  console.log("helath!");
  res.send("health!");
});

app.get("/api/recommend", async (req, res) => {
  /* TODO: 추천 결과 정보 */

  var options = {
    method: "GET",
    url: "https://movies-tvshows-data-imdb.p.rapidapi.com/",
    params: { type: "get-random-movies", page: "1" },
    headers: {
      "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com",
      "x-rapidapi-key": "7c1c27a5b4msh9043c7fd8d0acc0p18fa7ejsn189151ac97e1",
    },
  };
  try {
    let response = await axios.request(options);
    res.send(response.data);
  } catch (error) {
    console.error("🤬 에러!");
    res.send("🤬 에러!").end();
  }
});

app.get("/api/top10", async (req, res) => {
  /* 인기있는 영상 TOP10 정보 */
  const options = {
    method: "GET",
    url: "https://movies-tvshows-data-imdb.p.rapidapi.com/",
    params: { type: "get-popular-movies", page: "1", year: "2021" },
    headers: {
      "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com",
      "x-rapidapi-key": "7c1c27a5b4msh9043c7fd8d0acc0p18fa7ejsn189151ac97e1",
    },
  };

  try {
    let response = await axios.request(options);
    res.send(response.data);
  } catch (error) {
    console.error("🤬 에러!");
    res.send("🤬 에러!").end();
  }
});

app.get("/api/poster/:movieId", async (req, res) => {
  /* 영상 포스터 정보 */
  const movieId = req.params.movieId;
  const options = {
    method: "GET",
    url: "https://movies-tvshows-data-imdb.p.rapidapi.com/",
    params: { type: "get-movies-images-by-imdb", imdb: `${movieId}` },
    headers: {
      "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com",
      "x-rapidapi-key": "7c1c27a5b4msh9043c7fd8d0acc0p18fa7ejsn189151ac97e1",
    },
  };
  try {
    let response = await axios.request(options);
    res.send(response.data);
  } catch (error) {
    console.error("🤬 에러!");
    res.send("🤬 에러!").end();
  }
});

app.get("/api/detail/:movieId", async (req, res) => {
  /* 영상 상세 정보 */
  var options = {
    method: "GET",
    url: "https://movies-tvshows-data-imdb.p.rapidapi.com/",
    params: { type: "get-movie-details", imdb: `${movieId}` },
    headers: {
      "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com",
      "x-rapidapi-key": "7c1c27a5b4msh9043c7fd8d0acc0p18fa7ejsn189151ac97e1",
    },
  };
  try {
    let response = await axios.request(options);
    res.send(response.data);
  } catch (error) {
    console.error("🤬 에러!");
    res.send("🤬 에러!").end();
  }
});

app.listen(port, () => {
  console.log(`server gets started at ${port}`);
});
