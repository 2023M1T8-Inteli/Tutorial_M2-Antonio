
const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const port = 3000
const app = express();
app.use(express.json());

const dbPath = '/Users/macbook/Documents/CienciaDaComputacao/TesteSQL/PonderadaSem3/ponderada_v2.db';

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the database.');
    }
});

const http = require('http');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
});

// Rota para obter registros
app.get('/pessoas', (req, res) => {
    const sql = 'SELECT * FROM Pessoas';
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Erro ao coletar registros');
        } else {
            res.json(rows);
        }
    });
});

// Rota para obter registro pelo ID
app.get('/pessoa/:CPF', (req, res) => {
    const cpf = req.params.CPF;
    const sql = `SELECT * FROM Pessoas WHERE CPF = ?`;
    db.get(sql, [cpf], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Erro ao obter registro');
        } else if (!row) {
            res.status(404).send('Registro não encontrado');
        } else {
            console.log(row);
            res.json(row);
        }
    });
});

// Rota para adicionar novo registro

app.post('/pessoas', (req, res) => {
    let name = req.body.Nome;
    let cepf = req.body.CPF;
    let age = req.body.Idade;
    let adres = req.body.Endereco;
    let phone = req.body.Telefone;
    let mail = req.body.Email
    const sql = `INSERT INTO Pessoas(Nome, CPF, Idade, Endereco, Telefone, Email) VALUES ("${name}", ${cepf}, ${age}, "${adres}", ${phone}, "${mail}")`;
    db.run(sql, [], function(err,rows) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Erro ao adicionar registro');
        } else {
            res.json(rows);
            console.log(rows)
        }
    });
});

// Rota para atualizar um registro pelo ID
app.put('/pessoas/:CPF', (req, res) => {
    let name = req.body.Nome;
    let cpf = req.body.CPF;
    let age = req.body.Idade;
    let adres = req.body.Endereco;
    let phone = req.body.Telefone;
    let mail = req.body.Email;
    const cpfParam = req.params.CPF;
    const sql = `UPDATE Pessoas SET Nome = ?, Idade = ?, Endereco = ?, Telefone = ?, Email = ? WHERE CPF = ?`;
    db.run(sql, [name, age, adres, phone, mail, cpfParam], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Erro ao atualizar registro');
        } else if (this.changes === 0) {
            res.status(404).send('Registro não encontrado');
        } else {
            res.json({ cpf: cpfParam });
        }
    });
});

// Rota para deletar um registro
app.delete('/pessoas/:CPF', (req, res) => {
    const cpfParam = req.params.CPF;
    const sql = 'DELETE FROM Pessoas WHERE CPF = ?';
    db.run(sql, [cpfParam], function(err){
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(`Pessoa com cpf ${cpfParam} deletada com sucesso`);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});