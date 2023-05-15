const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const sqlite3 = require('sqlite3').verbose();
const DBPATH = '../data/ponderada_v2.db';

const hostname = '127.0.0.1';
const port = 3000
const app = express();

// Aplicar parte estática no FRONT
app.use(express.static("../frontend/"));

// Definir os endpoints
app.use(express.json());

// Retorna os registros
app.get('/Pessoa', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    var sql = `SELECT * FROM Pessoas ORDER BY Nome COLLATE NOCASE`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
            }
            res.json(rows)
        });
        db.close();
});

app.post('/insereUsuario', urlencodedParser, (req,res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    sql = `INSERT INTO Pessoas (Nome, CPF, Idade, Endereco, Telefone, Email) VALUES ("${req.body.nome}", "${req.body.CPF}", "${req.body.idade}", "${req.body.endereco}", "${req.body.telefone}", "${req.body.email}")`;
    console.log(sql);
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
    });
    res.write('<p>USUARIO INSERIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
    db.close();
    res.end();
});

app.get('/atualizaUsuario', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    sql = `SELECT * FROM Pessoas WHERE CPF=${req.query.CPF}`;
    console.log(sql);
    var db = new sqlite3.Database(DBPATH);
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});

app.post('/atualizaUsuario', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    sql = `UPDATE Pessoas SET Nome="${req.body.nome}", Idade="${req.body.idade}", Endereco="${req.body.endereco}", Telefone="${req.body.telefone}", Email="${req.body.email}" WHERE CPF="${req.body.CPF}"`;
    console.log(sql);
    var db = new sqlite3.Database(DBPATH);
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
        res.end();
    });
    res.write('<p>USUARIO ATUALIZADO COM SUCESSO!</p><a href="/">VOLTAR</a>');
    db.close();
})

app.get('/removeUsuario', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    sql = `DELETE FROM Pessoas WHERE CPF="${req.query.CPF}"`;
    console.log(sql);
    var db = new sqlite3.Database(DBPATH);
    db.run(sql, [], err => {
        if (err) {
            throw err;
        }
        res.write('<p>USUARIO REMOVIDO COM SUCESSO!</p><a href="/">VOLTAR</a>');
        res.end();
    });
    db.close();
});

app.listen(port, hostname, () => {
    console.log(`Servidor rodando em http://${hostname}:${port}/`);
})