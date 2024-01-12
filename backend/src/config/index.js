require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiration: process.env.JWT_EXPIRATION
    },
    subdomainStrategy: process.env.SUBDOMAIN_STRATEGY === 'true',
    logLevel: process.env.LOG_LEVEL
};
