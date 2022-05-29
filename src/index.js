const cors = require('cors');
const express = require('express');
const httpStatus = require('http-status');

const routes = require('./routes');
const config = require('./config/config');
const AppError = require('./utils/AppError');

const app = express();

// parse json request body
app.use(express.json());

// enable cors
app.use(cors());
app.options('*', cors());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// v1 api routes
app.use('/v1', routes);

app.get('/', (req, res, next) => {
    res.send("Task For Node JS.")
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new AppError(httpStatus.NOT_FOUND, 'Not found'));
});

app.listen(config.port, () => {
        console.log(`Listening to port ${config.port}`)
});
