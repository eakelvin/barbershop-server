require('dotenv/config');
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT;
const server = express();
const api = process.env.URL;

const database = require('./src/config/database');

database();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get('/', (req, res) => {
    res.send('BARBERSHOP SERVER')
});

server.listen(
    PORT, () => console.log(`Server Live On Port ${PORT}`)
);
