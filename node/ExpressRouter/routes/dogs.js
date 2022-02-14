const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Show all dogs.");
})

router.get('/:id', (req, res) => {
    res.send(`Show dog id: ${req.params.id}`);
})

router.get('/:id/edit', (req, res) => {
    res.send(`Edit this dog, with id: ${req.params.id}`);
})

module.exports = router;