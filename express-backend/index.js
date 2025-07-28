const express = require('express');
const app = express();

app.use(express.json());
require("dotenv").config();
const PORT = process.env.PORT || 5000;


// mounting routes


const urlRoutes = require('./routes/urlRoutes');
app.use('/api/url', urlRoutes);


const dbconnect = require('./config/database');
dbconnect();


// konse port pe chalega 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// home page pe kya dikhana hai
app.get('/', (req, res) => {
    res.send('Welcome to URL Shortener API');
});