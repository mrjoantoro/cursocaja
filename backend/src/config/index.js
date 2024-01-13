const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    port: process.env.PORT,
    db: {
        type: process.env.MONGODB_TYPE,
        host: process.env.MONGODB_HOST,
        port: process.env.MONGODB_PORT,
        name: process.env.MONGODB_NAME,
        user: process.env.MONGODB_USER,
        password: process.env.MONGODB_PASSWORD,
        database: process.env.MONGODB_DB,
        urlBase: `${process.env.MONGODB_TYPE}://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DB}`, 
        urlTenant: `${process.env.MONGODB_TYPE}://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}`, 
        config: {
            autoIndex: true,
            connectTimeoutMS: 10000,
            socketTimeoutMS: 30000,
        }
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiration: process.env.JWT_EXPIRATION
    },
    subdomainStrategy: process.env.SUBDOMAIN_STRATEGY === 'true',
    logLevel: process.env.LOG_LEVEL
};