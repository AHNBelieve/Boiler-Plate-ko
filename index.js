const express = require("express");
const app = express();
const port = 5000;

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://an0731an:dks123ss0219ss@boilerplate0.anvxt.mongodb.net/?retryWrites=true&w=majority&appName=BoilerPlate0"
  )
  .then(() => {
    console.log("mongoDB Connected");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
