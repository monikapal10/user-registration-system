const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = 3000;

// serve static files (css, js)
app.use('/public', express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:true}));

// ejs template engine
app.set("view engine","ejs");

// MongoDB connect
mongoose.connect("mongodb+srv://0506cs221110_db_pal:monikapal123@cluster01.8njylio.mongodb.net/usersDB?retryWrites=true&w=majority")
.then(() => {
    console.log("MongoDB Connected");

    // start server
    app.listen(PORT, ()=> {
        console.log(`Server running on http://localhost:${PORT}`);
    });

})
.catch(err => console.log(err));

// user schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

// user model
const User = mongoose.model("User", userSchema);

// home route
app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"));
});

// form submit
app.post("/submit", async (req,res)=>{

    const hashedPassword = await bcrypt.hash(req.body.password,10); // password hash

    const newUser = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    });

    await newUser.save(); // save in DB

    res.render("result",{
        name:req.body.name,
        email:req.body.email
    });

});

// test route
app.get("/test",(req,res)=>{
    res.send("API is working!");
});

// api users
app.get("/api/users", async (req,res)=>{
    const users = await User.find();
    res.json(users);
});