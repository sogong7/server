const fs = require('fs');
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host : 'database-2.crmeil0mqyyf.us-east-2.rds.amazonaws.com',
    user : 'admin',
    password : 'mypassword',
    port : '3306',
    database : 'management'
});
connection.connect();

app.get('/api/customers',(req,res)=>{
    connection.query(
        "SELECT * FROM CUSTOMER",
        (err,rows,fileds) => {
            res.send(rows);
        }
    );
})

app.listen(port,() => console.log(`Listening on port ${port}`));

 