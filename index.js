require('dotenv').config('../env');
const express = require('express');

// const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const serverless = require('serverless-http');

const config = require('./src/config/config');
var winston = require('./src/config/winston');
const { handleError } = require('./src/utils/error');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// adding Helmet to enhance your API's security
app.use(helmet());

// adding morgan to log HTTP requests
app.use(morgan('combined', { stream: winston.stream }));

const v1 = require('./src/routes/index');

app.use(v1);

app.use((err, req, res, next) => {
  handleError(err, res);
  next(err);
});

app.listen(config.httpPort, () => {
  winston.debug(
    `Server listening on port ${config.httpPort} and running on ${config.envName} environment`,
  );
});

module.exports.handler = serverless(app);
