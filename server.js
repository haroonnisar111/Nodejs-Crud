require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const { errorHandler } = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions');
const verifyJWT = require('./middleware/verifyJwt');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDb = require('./config/dbConn');
connectDb();
const PORT = process.env.PORT || 3500;
//custom middlewarelogger
app.use(logger);
//cross origin resource
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//middleware for cookieparser
// app.use(cookieParser);
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));
app.use(errorHandler);
mongoose.connection.once('open', () => {
  console.log('connected to mongo db');
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
});
