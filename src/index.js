const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./router/index.js');
const bodyParser = require('body-parser');
const app = express();

app.use(cors({ origin: `*`, optionsSuccessStatus: 200 }));

app.use(morgan('tiny')) //**
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)

const port = 3000;

app.listen(port, () => console.log(`servidor ligado`))