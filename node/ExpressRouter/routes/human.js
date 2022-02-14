const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('How are you hoo-man');
})

router.get('/:id', (req, res) => {
    res.send(`This is hoo-man with id: ${req.params.id}`);
})

router.get('/:id/edit', (req, res) => {
    res.send(`Editing hoo-man with id number: ${req.params.id}`)
})

module.exports = router;