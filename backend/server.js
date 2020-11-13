const express = require('express');
require('dotenv').config();
const errorHandler = require('./middleware/errorMiddleware');
const notFound = require('./middleware/notFound');
const connectToDB = require('./database');
const productRoutes = require('./routes/product');
const app = express();

app.use('/api/products', productRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
connectToDB().then(() => console.log('Connected to MongoDB...'));
app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}...`));