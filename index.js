
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const IndexRoutes = require('./routes/index');
const MongodbUrl = 'mongodb+srv://szaheer64419je0732:VPnuUvspxAjYeDzd@cluster0.mvatp53.mongodb.net/';
const Port = 5000;
const app = express();

app.use(express.json());
app.use(cors());
// app.use(compression());
// app.use(bodyParser.urlencoded({ extended: true, useNewUrlParser: true }));


mongoose.connect(
  MongodbUrl,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
app.use('/api/books', IndexRoutes);
app.get("/", (_, res) => {
  res.status(200).send("Welcome to Library App");
});
app.listen(Port, () => {
  console.log(`Server running on Port ${Port}`);
});