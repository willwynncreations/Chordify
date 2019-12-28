const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
const history = require("connect-history-api-fallback");

const app = express();
app.use(cors());
app.use(bodyParser.json({
    type: "application/json"
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));


dotenv.config();

const port = process.env.PORT || 8001;

// create the server
app.listen(port, () => {
    console.log(`Server online! Please proceed to port ${port} for rapid assimilation.`);
});