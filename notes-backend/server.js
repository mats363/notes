const express = require("express");
const app = express();
const router = express.Router();
const mysql = require("mysql2");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const port = 4000;

app.locals.con = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "Jabba666",
    database: "classicmodels"
})

app.listen(port, () => { console.log("Server is running on port: " + port)})

app.get("/", (req, res) => {
    res.send("Funkar");
})