const express = require('express');
const app = express();
const port = 4000;
const {connect} = require('mongoose');
const morgan = require('morgan');
connect('mongodb://127.0.0.1:27017/data');
const cors = require('cors');
const router = require('./routes/model');
const authRouter = require('./routes/auth');

app.use(morgan('tiny'))
app.use(express.json());
app.use(cors());

app.use('/', router);
app.use('/auth', authRouter);


app.listen(port, () => {
    console.log(`your sever is listening on ${port}`);
});