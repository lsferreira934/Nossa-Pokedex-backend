const express = require('express');
const router = require('./route/router');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors({ origin: `http://localhost:3030` }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', router)

const port = 3000;

app.listen(port, () => console.log(`servidor ligado http://localhost:${port}/api`))