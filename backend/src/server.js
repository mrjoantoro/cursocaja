const app = require('./app');
const config = require("./config");
const logger = require('./lib/logger'); 

const PORT = config.port;


app.listen(PORT, () => {
    console.log(`Server running on port on http://localhost:${PORT}`);
    logger.info(`Server running on port on http://localhost:${PORT}`);
});
