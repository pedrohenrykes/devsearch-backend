const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.listen(3333);
app.use(cors());
app.use(express.json());
app.use(routes);

const dbuser = 'phsysuser';
const dbpass = 'phga%409302';
const dbname = 'omnistack10';
const connString = `mongodb+srv://${dbuser}:${dbpass}@cluster0-vphtr.gcp.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(connString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
