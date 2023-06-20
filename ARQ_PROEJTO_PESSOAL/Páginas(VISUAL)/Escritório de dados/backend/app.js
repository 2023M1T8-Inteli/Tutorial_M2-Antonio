const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const sqlite3 = require('sqlite3').verbose();
const DBPATH = '/Users/macbook/Documents/GitHub/Projeto2/src/Backend/src/database/BANCO DE DADOS ATUALIZADO.db';

const hostname = '127.0.0.1';
const port = 3001
const app = express();

app.use(express.static("../frontend"));
// Definir os endpoints
app.use(express.json());

app.get('/mapData/choque/all', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    var sql = `SELECT * FROM choques`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        } else {
            res.json(rows)
        }
    });
    db.close();
});

app.get('/mapData/choque/f1', (req, res) => {
    res.statusCode = 200;
    console.log(req.body.sliderF1)
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    var sql = `SELECT F_max, id_viagem, Data_Hora, Velocidade, tipo FROM choques WHERE F_max BETWEEN ${req.query.sliderF1} AND ${req.query.sliderF2} AND tipo = 1`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        } else {
            res.json(rows)
        }
    });
    db.close();
});

app.get('/mapData/choque/f2', (req, res) => {
    res.statusCode = 200;
    console.log(req.query.sliderF11)
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    var sql = `SELECT F_max, id_viagem, Data_Hora, Velocidade, tipo FROM choques WHERE F_max BETWEEN ${req.query.sliderF11} AND ${req.query.sliderF22} AND tipo = 2`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        } else {
            res.json(rows)
        }
    });
    db.close();
});

app.get('/mapData/choque/pc', (req, res) => {
    res.statusCode = 200;
    console.log(req.query.sliderF11)
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    var sql = `SELECT F_max, id_viagem, Data_Hora, Velocidade FROM choques WHERE F_max BETWEEN ${req.query.sliderPC1} AND ${req.query.sliderPC2}`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        } else {
            res.json(rows)
        }
    });
    db.close();
});

app.get('/mapData/choque/p', (req, res) => {
    res.statusCode = 200;
    console.log(req.query.sliderF11)
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    var sql = `SELECT Engate, id_viagem, Data_Hora, Velocidade FROM picos WHERE Engate BETWEEN ${req.query.sliderP1} AND ${req.query.sliderP2}`;
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