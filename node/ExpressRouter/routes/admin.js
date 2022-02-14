const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    if (req.query.isAdmin) {
        next();
    }
    res.send('Denied: Need Admin Rights!');
})

router.get('/secret', (req, res) => {
    res.send('This is admins secret page... shhhhh!');
})

router.get('/deleteall', (req, res) => {
    res.send('Deleting all with admin rights.');
})

module.exports = router;