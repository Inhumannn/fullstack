const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Use model mongoose for save thing.js in bdd
const Thing = require("./models/thing");

// Connection server mongodb
mongoose
  .connect(
    "mongodb+srv://thomaspenabermond:NZjhG2h5MyVcAGFA@cluster0.axqjyrs.mongodb.net/",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
// Allows you to make a post request
app.use(express.json());

// Fix : erreurs de Cross Origin Resource Sharing (CORS 3000)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// app.use(bodyParser.json()); // Fait crach le server

app.post("/api/stuff", (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
    // "...req.body" : copy element of req.body
    ...req.body,
  });
  // registration
  thing
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) =>
      res.status(400).json({ message: `erreur post : ${error} ` })
    );
});

// display page article
app.get("/api/stuff/:id", (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) =>
      res.status(404).json({ message: `erreur article page : ${error} ` })
    );
});
// display main page
app.get("/api/stuff", (req, res, next) => {
  Thing.find()
    .then((thing) => res.status(200).json(thing))
    .catch((error) =>
      res.status(404).json({ message: `erreur home page : ${error} ` })
    );
});

module.exports = app;
