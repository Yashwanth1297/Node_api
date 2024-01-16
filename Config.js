const dotenv = require('dotenv');
const envFile = `Environments/.env.${process.env.NODE_ENV || 'dev'}`;
dotenv.config({ path: envFile });
module.exports = {
db_connection: process.env.connection_string,
Port : process.env.port,
accessTokenSecret : process.env.ACCESS_TOKEN_SECRET,
refreshTokenSecret : process.env.REFRESH_TOKEN_SECRET
}
