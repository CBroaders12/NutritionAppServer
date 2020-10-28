require('dotenv').config();

const Express = require('Express');
const db = require('./db');

const app = Express();
const port = 5200;


//TODO: Import Controllers

//TODO: CORS Middleware

app.use(Express.json());

//Controller Routes
//Open Routes
//TODO: /user route

//Authenticated Routes
//TODO: /log route

app.listen(port, () => console.log(`[server]: Listening on http://localhost:${port}`));