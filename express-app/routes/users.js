const express = require('express');
const router = express.Router();

const users = []
users.push(
    {
        id: 1,
        name: "name"
    },
    {
        id: 2,
        name: "anton"
    },
    {
        id: 3,
        name: "gus amogu"
    }
)
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.json({
        items: users
    })
});

router.post('/', function(req, res, next) {
    const lastId = users[users.length - 1].id;
    const newUser = {
        id: lastId + 1,
        name : req.body.name
    }

    users.push(newUser)
    res.status(201).json(newUser);
});

router.get('/:id', function(req, res, next) {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
});

module.exports = router;
