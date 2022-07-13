const express = require ('express');
const router = require('./route/router');
const app = express ();

app.use(express.json());

const port = 3000

app.use('/api', router)


app.listen(port, () => console.log(`servidor ligado http://localhost:${port}/api`))