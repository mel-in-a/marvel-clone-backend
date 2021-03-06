require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(formidable());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Welcome on Marvel API !" });
});

app.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&skip=${req.query.skip}&name=${req.query.name}`
    );
    // console.log(result.data);
    res.json(response.data);
  } catch (error) {
    console.error(error);
  }
});

app.get("/comics/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.id}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.status(200).json(response.data);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
});

app.all("*", (req, res) => {
  res.json({ message: "Cette route n'existe pas !" });
});

app.listen(process.env.PORT || 3200, () => {
  console.log("Server Started");
});
