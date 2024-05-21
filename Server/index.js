const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes.js');
const animalRoutes = require('./routes/animalRoutes.js');
const connectToDB = require('./config/connectToDB');

const app = express();
app.use(express.json());

app.use(cors({
    origin: true,
    credentials: true,
}));
dotenv.config();
app.use('/', userRoutes);
app.use('/animal',animalRoutes);


connectToDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
