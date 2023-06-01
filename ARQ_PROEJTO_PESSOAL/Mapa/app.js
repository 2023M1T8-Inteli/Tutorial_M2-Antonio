const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const sqlite3 = require('sqlite3').verbose();
const DBPATH = '/Users/macbook/Documents/GitHub/Tutorial_M2-Antonio/ARQ_PROEJTO_PESSOAL/backend/src/database/banco_de_dados_ipt_grupo02.db';

const hostname = '127.0.0.1';
const port = 3001
const app = express();

app.use(express.static("/Users/macbook/Documents/GitHub/Tutorial_M2-Antonio/ARQ_PROEJTO_PESSOAL/Mapa/frontend"));
// Definir os endpoints
app.use(express.json());

app.get('/mapData/choque', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    var sql = `SELECT id, Latitude, Longitude FROM choque`;
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