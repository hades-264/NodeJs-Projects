const express = require('express');
const urlRouter = require('./routes/route');
const connectMongoDB = require('./connection');

const app = express();
const PORT = 8001;

connectMongoDB('mongodb://127.0.0.1:27017/short-url');

app.use(express.json());

app.use('/', urlRouter);

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
