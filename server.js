const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const path = require('path')
const helmet = require('helmet');
const compression = require('compression');
const cool = require('cool-ascii-faces');
const morgan = require('morgan');
const app = express();
require('dotenv').config();


// db config 🐰
require('./src/config/db.config');

// providing a Connect/Express middleware that can be used to enable CORS with various options.
app.use(cors());

app.use(compression());
// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
// app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(express.json({ limit: '5mb' }));
app.use(
    express.urlencoded({
        extended: true,
    })
);

// another logger to show logs in console as well
app.use(morgan('dev'));



// Helmet helps you secure your Express apps by setting various HTTP headers. It’s not a silver bullet, but it can help!
// DOC: https://helmetjs.github.io/ 😎
app.use(helmet());

const publicDir = require('path').join(__dirname, 'public');
app.use(express.static(publicDir));

// default api route 😈
app.get("/", (req, res) => {
    res.json({
        status: true,
        message: 'Welcome to MeraLahore API',
        cheers: cool(),
    })
});

// import all routes at once
require('./src/utils/routes.utils')(app);

const port = process.env.PORT;


// initializing server 😻
app.listen(port, () =>
    console.log(`%s Server is listening on port ${port} `, chalk.green('✓'))
);

// Handling non-existing routes
require('./src/utils/error-handler.utils')(app);
