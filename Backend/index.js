require('dotenv').config()
const express = require("express");
const connectToMongo = require("./db");
const farmerRoute = require("./routes/Farmer");
const merchantRoute = require("./routes/Merchant");
const cropfarmerRoute =require("./routes/Cropfarmer");
const cropmerchantRoute =require("./routes/Cropmerchant");
const bodyParser = require("body-parser");
const test=require("./routes/test");

const cors = require('cors');    
// const corsOpts = {
//     origin: '*',
//     credentials: true,
//     methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
//     allowedHeaders: ['Content-Type'],
//     exposedHeaders: ['Content-Type']
// };

connectToMongo();

const app = express();
const port = 8000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/images',express.static('images'));
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Market,market, Accept, Authorization, Auth, auth');

//   // Allow preflight requests to proceed
//   if (req.method === 'OPTIONS') {
//     res.sendStatus(200);
//   } else {
//     next();
//   }
// });
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "*");
//   next();
// });
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World from jim!')
})
//Available Routes
app.use("/test",test);
app.use("/api/farmer", farmerRoute);
app.use("/api/merchant", merchantRoute);
app.use("/api/sell/farmer", cropfarmerRoute);
app.use("/api/buy/merchant", cropmerchantRoute);

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
