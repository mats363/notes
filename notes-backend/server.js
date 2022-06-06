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

app.get("/", (req, res) => {
    res.send("Funkar");
})

app.get("/posts", async (req, res)  => {

    try {
        const result = await connection.promise().execute("SELECT * FROM posts")
        console.log(result[0])
        res.json(result);    
        
    } catch (err) {
        res.json("Could not fetch posts");
    }

    
})


app.post("/posts/new", async (req, res) => {

    //const sql = "Testar en variabel i app.post"
    try {
        const result = await connection.execute(
            "INSERT INTO posts (postContent) VALUES (?)",
            [req.body.postContent]
            )
        res.json("Post successful!");
    } catch(err) {
        res.json("Could not submit post :/")
    }
  
})

