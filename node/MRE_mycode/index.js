const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Product = require('./models/product');
const Farm = require('./models/farm');
const farm = require('./models/farm');

main().catch(err => console.log('ERRORRRRR ERRRRR!!!!!: ', err));
async function main() {
    await mongoose.connect('mongodb://localhost:27017/farmerStandVer2');
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));

/// Farms Route Section
app.get('/farms', async (req, res) => {
    const farms = await Farm.find({});
    res.render('farms/index', { farms });
})

app.post('/farms', async (req, res) => {
    const newFarm = new Farm(req.body);
    await newFarm.save();
    res.redirect('/farms')
})

app.get('/farms/new', (req, res) => {
    res.render('farms/new');
})

app.get('/farms/:id', async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    console.log(farm);
    res.render('farms/detail', { farm });
})

app.get('/farms/:id/products/new', (req, res) => {
    const { id } = req.params;
    res.render('products/new', { categories, id });
})

app.post('/farms/:id/products', async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    const { name, price, category } = req.body;
    const newProd = new Product({ name, price, category }); //or pass "req.body" directly here
    // const prod = await newProd.save();

    farm.products.push(newProd);
    newProd.farm = farm;
    await farm.save();
    await newProd.save();
    res.send(farm);
})

/// Products Route Section
const categories = ['dairy', 'fruit', 'vegetable'];

app.get('/products', async (req, res) => {
    let { category } = req.query;
    let products;
    if (category) {
        products = await Product.find({ category });
    } else {
        products = await Product.find({});
        category = 'All';
    }
    // console.log(products);
    // // res.send('All Products List: ');
    res.render('products/index', { products, category });
})

app.post('/products', async (req, res) => {
    const newProd = new Product(req.body);
    await newProd.save();
    // console.log(req.body);
    // res.send("creating your product");
    // res.redirect('/products')
    res.redirect(`/products/${newProd._id}`)
})

app.get('/products/new', (req, res) => {
    res.render('products/new', { categories });
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    console.log(product);
    // res.send("ID Found!");
    // res.render('products/detail', { product })
    res.render('products/detail', { product })
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories });
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`);
})

app.delete("/products/:id", async (req, res) => {
    const { id } = req.params;
    const remProd = await Product.findByIdAndDelete(id);
    res.redirect('/products')
})

app.get('*', (req, res) => {
    res.send("<h2>We got your request, This is an unhandled route...</h2>");
})

app.listen(3000, () => {
    console.log("APP IS LISTENING PORT 3000 !!!!");
})