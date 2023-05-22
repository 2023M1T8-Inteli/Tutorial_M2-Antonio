const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const sqlite3 = require('sqlite3').verbose();
const DBPATH = '/Users/macbook/Documents/GitHub/Prsnl/backend/src/database/banco_de_dados_ipt_grupo02.db';

const hostname = '127.0.0.1';
const port = 3000
const app = express();

app.use(express.static("../frontend/"));

app.use(express.json());

// Endpoints **REDIRECT

app.get('/', (req, res) => {
    // Redirect para a página "Meus projetos"
    res.redirect('/meus-projetos')
})

// Endpoints **PERFIL

app.get('/meu-perfil', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH)
    var sql = `SELECT * FROM User WHERE id=${req.query.id}`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            res.json(rows)
        });
        db.close();
});

// Endpoints **PROJETO
app.get('/projeto/vagao', (req,res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    var sql = `SELECT * FROM Vagao WHERE id=${req.query.id}`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows)
    });
    db.close();
});

app.get('/projeto/picos', (req,res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    var sql = `SELECT * FROM Pico WHERE viagem_id=${req.body.viagem_id}`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows)
    });
    db.close();
});

app.get('/projeto/choques', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    var sql = `SELECT * FROM Choque WHERE viagem_id=${req.body.viagem_id}`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows)
    });
    db.close();
});

// Endpoints comparação

app.get('/projeto/comparacao', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    var sql = `SELECT * FROM Choque, Pico, Vagao WHERE id_vagao=${req.body.id_vagao}`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});


app.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}/`)
})


