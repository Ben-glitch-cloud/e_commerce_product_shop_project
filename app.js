import express from 'express';
const app = express()
const port = 3000

app.set('view engine', 'ejs');

import ProductModels from './model/products.js';

let product_models = new ProductModels(); 

app.get('/', async function (req, res) {
    res.render('pages/index', {data: await product_models.getAllProducts()});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})





