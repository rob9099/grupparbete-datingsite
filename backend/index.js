const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const routes = require ('./routes');

const index = express();
const port = 5000;

mongoose.connect(process.env.DATABASE_ACCESS, () => console.log('Database connected'))














index.use('/', routes);
index.listen(port, () => console.log(`Server started on port ${port}`))