const express = require('express');
const morgan = require('morgan');       
const helmet = require('helmet');       
const cors = require('cors');        
const errorHandler = require('../src/api/middlewares/errorHandler');
const userRoutes = require('./api/routes/userRoutes');

const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/users', userRoutes);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
