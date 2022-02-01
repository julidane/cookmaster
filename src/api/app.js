const bodyParser = require('body-parser');
const path = require('path');
const errorMiddleware = require('../middlewares/error');
const router = require('../controllers/router');
const express = require('express');

const app = express();

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador
app.use(bodyParser.json());
app.use(router);
app.use(errorMiddleware);
app.use('/images', express.static(path.resolve(__dirname, '../uploads')));

module.exports = app;