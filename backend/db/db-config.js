const dotenv = require('dotenv');

dotenv.config({path: './.env'});

module.exports = {
    'host': process.env.DB_HOST,
    'user': process.env.DB_USER,
    'password': process.env.DB_PASS,
    'database': process.env.DB
}