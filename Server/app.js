require('./config/config');
const express = require("express");
const bodyParser = require("body-parser");
const router = require('./router');
const jwt = require('./helpers/jwt.helper');
const cors = require('cors');
require('./models/db');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.get('/', jwt.verifyJWT, async (req, res, next) => {
    res.send("Hello from express");
});
app.use('/api', router);

app.use(async (req, res, next) => {
    const error = new Error("Not Found");
    error.status = 400;
    next(error);
});

app.use(async (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
});
app.listen(8080, (err, res) => {
    if (!err) {
        console.log("Express server is start on port:" + 8080);
    }
});