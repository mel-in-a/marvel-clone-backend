const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

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


app.get("/comics", async (req, res) => {
  try {
      const response = await axios.get(
          `https://lereacteur-marvel-api.herokuapp.com/comics/${id}?apiKey=${process.env.MARVEL_API_KEY}&skip=${req.query.skip}`
        );
        // console.log(result.data);
        res.json(response.data);
  } catch (error) {
      console.error(error);
  }
      
  });


app.all("*", (req, res) => {
  res.json({ message: "Cette route n'existe pas !" });
});

app.listen(process.env.PORT, () => {
  console.log("Server Started");
});
