const express = require('express');
const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('mydb.db');
db.run(`CREATE TABLE IF NOT EXISTS users (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name text)`);

const router = express.Router();

router.get('/', function(req, res, next) {
    db.all("SELECT id, name FROM users", function(err, rows) {
        if (err) {
            return res.status(404).json({ message: "no users in db" });
            console.log(err);
        } else {
            res.json({ items: rows });
        }
    })
});

router.post('/', function(req, res, next) {
    const name = req.body.name
    if (!name) {
        return res.status(400).json({ error: "name is required" });
    }

    const insert = "INSERT INTO users (name) VALUES (?)";
    db.run(insert, [name], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "db error" });
        }

        res.status(201).json({
            id: this.lastID,
            name: name
        });
    });
});

router.get('/:id', function(req, res, next) {
    const id = req.params.id
    db.get("SELECT id, name FROM users WHERE id = ?", [id], (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(404).json({ message: "User not found" });
        } else {
            res.send(rows);
        }
    });
});

module.exports = router;
