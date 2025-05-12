require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

//connect to mongoDB
connectDB();

// Cross Origin Resource Sharing
app.use(cors(corsOptions)); 

// built in middleware for json
app.use(express.json());

//server static files
app.use('/', express.static(path.join(__dirname, '/public')));

//routes
app.use('/', require('./routes/root'));

app.use('/states', require('./routes/api/states'));

app.all('*splat', (req, res) => {
    res.status(404);
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
    else if(req.accepts('json')) {
        res.json({ error: "404 page not found"});

    } else {
        res.type('txt').send("404 page not found");
    }
    
});

//error handling middleware
app.use(errorHandler)
app.use(logger);

//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
});