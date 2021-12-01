const bodyParser = require('body-parser');
const express = require('express');
const app = require('./app');
const errorMiddleware = require('../middlewares/error');

const router = require('../controllers/router');

app.use(bodyParser.json());

app.use(router);
app.use(errorMiddleware);
app.use('/images', express.static('uploads/'));

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
