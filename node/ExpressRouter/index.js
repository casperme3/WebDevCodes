const express = require('express');
const app = express();
const dogRoute = require('./routes/dogs');
const humanRoute = require('./routes/human');
const adminRoute = require('./routes/admin');

// app.use((req, res, next) => {
//     if (req.query.isAdmin) {
//         next();
//     }
//     res.send('Denied: Need Admin Rights!');
// })

app.use('/dogs', dogRoute);
app.use('/humans', humanRoute);
app.use('/admins', adminRoute);

app.get('*', (req, res) => {
    res.send(`zzzzzz unhandled route.`)
})

app.listen(3000, () => {
    console.log("APP IS LISTENING PORT 3000 !!!!");
})