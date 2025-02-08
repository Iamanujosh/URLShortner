const {connectMongo} = require("./connection");
const express = require("express");
const path = require("path");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const PORT = 8001;

//Connection to mongo
connectMongo("mongodb://127.0.0.1:27017/urlShort")
.then(() => console.log("Mongo Connected!!"))
.catch((err) => console.log("You got errors dude: ",err));

const app = express();
app.set("view engine", "ejs");
app.set("views",path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/url",urlRoute);
app.use("/user",userRoute);
app.use("/",staticRoute);


app.listen(PORT, () => {
    console.log(`Server Started At ${PORT}`);
})