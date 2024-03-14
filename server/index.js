const express = require('express'); 
const cors = require('cors'); 
const app = express(); 
require('dotenv').config();
app.use(express.json());
const db = require('./models');

// Enable CORS 
app.use(cors({ 
    origin: process.env.CLIENT_URL 
}));


// Simple Route 
app.get("/", (req, res) => { 
    res.send("Welcome to the learning space."); 
}); 

db.sequelize.sync({ alter: false }) 
    .then(() => { 
        let port = process.env.APP_PORT; 
        app.listen(port, () => { 
            console.log(`Sever running on http://localhost:${port}`); 
        }); 
    }) 
    .catch((err) => { 
        console.log(err); 
    });


// Routes 
const tutorialRoute = require('./routes/tutorial'); 
app.use("/tutorial", tutorialRoute);