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

module.exports = router;
