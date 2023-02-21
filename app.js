const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');

const ProductModels = require('./model/products.js')

let product_models = new ProductModels(); 

app.get('/', function (req, res) {
    res.render('pages/index', {data: product_models.getAllProducts()});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})





