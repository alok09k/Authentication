const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const dbConnection = require('./config/dbConnection')

require('dotenv').config();
const PORT = process.env.PORT || 4000;


// Middle waare
app.use(cors());
app.use(bodyParser.json());

// Server listen
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

// Routes
const auth = require('./routes/auth');
app.use('/auth',auth);

// DB Connection
dbConnection();

// Default Route
app.get('/', (req, res) => {
    res.send("Hello jee kaise ho sare")
});