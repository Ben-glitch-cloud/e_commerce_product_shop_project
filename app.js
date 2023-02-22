import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express()
const port = 3000

app.set('view engine', 'ejs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use(express.static("public"));
app.use('/public', express.static('public'));
// app.use(express.static(path.join(__dirname, "/public")));

import ProductModels from './model/products.js';

let product_models = new ProductModels(); 

app.get('/', async function (req, res) {
    res.render('pages/index', {data: await product_models.getAllProducts()});
})

app.get('/product/:id', async function (req, res) {
    res.render('pages/product', {product_data: await product_models.getOneProduct(req.params.id)});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})





