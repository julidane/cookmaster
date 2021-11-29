const bodyParser = require('body-parser');
const app = require('./app');
const errorMiddleware = require('../middlewares/error');

const router = require('../controllers/router');

app.use(bodyParser.json());

app.use(router);
app.use(errorMiddleware);

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));
