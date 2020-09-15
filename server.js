const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = express();

//Import controllers
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const newEntry = require("./controllers/new");

//DB Config
mongoose.connect(process.env.MONGO_DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
const User = require("./models/user");

//Middlewares
app.use(cors());
app.use(bodyParser.json());

//API Endpoints
app.get("/", (req, res) => {
    res.status(200).json("Yo");
});
app.post("/signin", signin.handleSignin(User, bcrypt));
app.post("/register", register.handleRegister(User, bcrypt));
app.post("/new", newEntry.handleNew(User));

//Listeners
app.listen(process.env.PORT, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});
