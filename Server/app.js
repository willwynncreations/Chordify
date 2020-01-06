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

mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0-rdbjw.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`,{
    useNewUrlParser:true,
    useFindAndModify:false
});

// pulling in routes
const index=require("./routes/index");
const auth=require("./routes/auth");
const child = require("./routes/child")

// plugging in route
app.use('/index',index);
app.use('/auth',auth);
app.use('/child',child);

const port = process.env.PORT || 8001;

// create the server
app.listen(port, () => {
    console.log(`Server online! Please proceed to port ${port} for rapid assimilation.`);
});