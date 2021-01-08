const express = require('express');
const app = express();
const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/api', {useNewUrlParser: true});
mongoose.connect('mongodb://localhost:27017/api', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const userRoutes = require('./routes/user');
const cors = require('cors');

// use it before all route definitions
app.use(cors({origin: 'http://localhost:4200'}));

app.use('/users', userRoutes);



app.use((req, res, next) => {
    
    res.status(400).json({ message: 'Invalid request' });
});


module.exports = app;