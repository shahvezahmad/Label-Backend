const express = require("express");
const mongoose = require("mongoose");
const routes = require("./Routes/route");

require("dotenv").config();

const app = express();

app.use(express.json());


const connectWithDb = require("./Config/database");
connectWithDb();

app.use('/api', routes);

app.listen(process.env.PORT, () => {
    console.log("app started succesfully");
})
