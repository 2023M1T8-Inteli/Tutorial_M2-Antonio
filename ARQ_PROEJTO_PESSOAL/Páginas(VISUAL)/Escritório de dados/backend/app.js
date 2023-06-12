const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const sqlite3 = require('sqlite3').verbose();
const DBPATH = '/Users/macbook/Documents/GitHub/IPT_equipe02/backend/src/database/teste.db';

const hostname = '127.0.0.1';
const port = 3001
const app = express();

app.use(express.static("../frontend"));
// Definir os endpoints
app.use(express.json());

app.get('/mapData/choque', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    var sql = `SELECT * FROM choque2`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        } else {
            res.json(rows)
        }
    });
    db.close();
});

app.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
})