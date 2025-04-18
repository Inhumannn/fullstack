const express = require("express");
const app = express();
const mongoose = require("mongoose");
const stuffRoutes = require("./routes/stuff");

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

app.use("/api/stuff", stuffRoutes);

module.exports = app;
