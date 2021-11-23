const mongoose = require('mongoose');
const Product = require('./models/product');

main().catch(err => console.log('ERRORRRRR ERRRRR!!!!!: ', err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/farmerStand');
}

// const p = new Product({
//     name: 'Grapes Fruiit',
//     price: 100,
//     category: 'Fruit'
// });

// p.save()
//     .then(p => {
//         console.log(p);
//     })
//     .catch(e => {
//         console.log(e);
//     });

const seedProds = [
    {
        name: 'Eggplany',
        price: 20,
        category: 'vegetable'
    },
    {
        name: 'CocoMelon',
        price: 25,
        category: 'fruit'
    },
    {
        name: 'Gatas',
        price: 96,
        category: 'dairy'
    },
    {
        name: 'Ampalaya',
        price: 50,
        category: 'vegetable'
    },
    {
        name: 'Cheese',
        price: 120,
        category: 'dairy'
    },
    {
        name: 'Mango',
        price: 110,
        category: 'Fruit'
    },
]

Product.insertMany(seedProds)
    .then(res => {
        console.log(res);
    })
    .catch(e => {
        console.log(e);
    })