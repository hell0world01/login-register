const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const app = express();
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodejs"
})

app.post("/signup", (req, res) => {
    const {name, email, password} = req.body;
    console.log("before hashing :",name, email, password);
    bcrypt.hash(password,saltRounds, (err, hasdedPassword) => {
        if(err){
            return res.status(500).json({ error: err.message})
        }
        const sql = "INSERT INTO users (`name`,`email`,`password`) VALUES (?)"
        const values = [
            name,
            email,
            hasdedPassword
        ]
        db.query(sql, [values], (err, data) => {
            if(err){
                return res.status(500).json({error: err.message});
            }
            return res.json(data)
        })
        console.log("after hasing :",name,email,hasdedPassword );
    })
})
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log("Login request:", req.body);
    const sql = "SELECT * FROM users WHERE `email` = ?";
    db.query(sql, [email], (err, data) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (data.length === 0) {
            return res.status(401).json("Fail");
        }

        const user = data[0];
        console.log("User :",user);
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            console.log("Given password :" ,password);
            console.log("Stored hased password  :",user.password);
            console.log("Matched result",result);

            if (result) {
                return res.json("Success");
            } else {
                return res.json("Fail");
            }
        });
    });
});

app.listen(1111,"127.0.0.1", () => {
    console.log("Listening on 127.0.0.1:1111")
})