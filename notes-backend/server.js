const express = require("express");
const app = express();
const router = express.Router();
const mysql = require("mysql2");
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(express.json())

const port = 4000;

const connection = mysql.createConnection({
    host: "localhost",
    port: "8889",
    user: "root",
    password: "jabba666",
    database: "notes"
})

app.listen(port, () => { console.log("Server is running on port: " + port)})

const adminUser = {username: "janne", password: "janne"}
let isLoggedIn;

app.get("/posts", async (req, res)  => {

    try {
        if (isLoggedIn) {
        const result = await connection.promise().execute("SELECT * FROM posts")
        console.log(result[0])
        res.json(result[0]);    
        } else {
            res.json("You are not logged in");
        }
        
    } catch (err) {
        res.json("Could not fetch posts");
    }    
})

app.post("/posts/new", async (req, res) => {

    try {
        const result = await connection.execute(
            "INSERT INTO posts (postContent, postTitle) VALUES (?, ?)",
            [req.body.postContent, req.body.postTitle]
            )
        res.json("Post successful!");
    } catch(err) {
        res.json("Could not submit post :/")
    }
  
})

app.get("/posts/:id", async (req, res) => {
    
    try {
        const result = await connection.promise().execute(
            "SELECT * FROM posts WHERE _id = ?",
            [req.params.id]
        );
        res.json(result)
    } catch(err) {
        res.json("Could not find ID")
    }
})

app.patch("/posts/:id", async (req, res) => {

    try {

        if (isLoggedIn) {
        const result = await connection.promise().execute(
            "UPDATE posts SET postContent = ? WHERE _id = ?",
            [req.body.postContent, req.params.id]
        )
        res.json(result)
        } else {
            res.json("You are not logged in")
        }
    } catch (err) {
        console.log("Does not work. At all.")
    }
})

app.post("/login", (req, res, next) => {
    if (req.body.username === adminUser.username && req.body.password === adminUser.password) {
        isLoggedIn = true;
        res.json(isLoggedIn)
    } else {
        isLoggedIn = false;
        res.status(401).json(isLoggedIn)
    }
})