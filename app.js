require('dotenv').config();

const Express = require('Express');
const db = require('./db');

const app = Express();

// Controllers
const controllers = require('./controllers')

// CORS Middleware
app.use(require('./middleware/corsMiddleware'));

// JSON middleware
app.use(Express.json());

//Controller Routes
//Open Routes
app.use('/user', controllers.User);

//Authenticated Routes
//TODO: /log route
app.use(require('./middleware/validate-session'));
app.use('/food', controllers.Food);

db.authenticate()
.then(() => db.sync())
.then(() => {
  app.listen(5200, () => console.log(`[server]: Listening on http://localhost:5200`));
})

