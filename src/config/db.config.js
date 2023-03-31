const mongoose = require('mongoose');
const { msToTime } = require('../utils/ms-to-time.utils');
const chalk = require('chalk');
const mongoUrl = process.env.DB_URL;

mongoose.Promise = global.Promise;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const connectWithRetry = () => {
    let delay = 5000;
    console.log(chalk.yellow(`Trying to connect to MongoDB...`));
    mongoose
        .connect(mongoUrl, options)
        .then(() => {
            console.log(chalk.green(`MongoDB is connected`));
        })
        .catch((err) => {
            console.log(chalk.red(`MongoDB connection unsuccessful, retry after ${msToTime(delay)}`));
            setTimeout(connectWithRetry, delay);
        });
};

connectWithRetry();