require('dotenv').config()
const express = require("express");
const connectToMongo = require("./db");
const farmerRoute = require("./routes/Farmer");
const merchantRoute = require("./routes/Merchant");
const cropfarmerRoute =require("./routes/Cropfarmer");
const cropmerchantRoute =require("./routes/Cropmerchant");
const bodyParser = require("body-parser")

const cors=require("cors");

connectToMongo();

const app = express();
const port = 8000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/images',express.static('images'))
app.use(express.json());
//Available Routes
app.use("/api/farmer", farmerRoute);
app.use("/api/merchant", merchantRoute);
app.use("/api/sell/farmer", cropfarmerRoute);
app.use("/api/buy/merchant", cropmerchantRoute);

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
