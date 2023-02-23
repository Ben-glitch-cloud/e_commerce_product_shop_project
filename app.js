import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import session from 'express-session';
import { fileURLToPath } from 'url';
import ProductModels from './model/products.js';


const app = express()
const port = 3000


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'keyboard',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

app.use(bodyParser.json());

app.set('view engine', 'ejs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/public', express.static('public'));

let product_models = new ProductModels(); 

app.get('/', async function (req, res) {
    res.render('pages/index', {products_data: await product_models.getAllProducts(), categorie_data: await product_models.getAllProductCategories()});
})

app.get('/product/:id', async function (req, res) {
    res.render('pages/product', {product_data: await product_models.getOneProduct(req.params.id)});
})

app.post('/categorie/', async function (req, res){
    if(req.body.categories === 'All Products'){ 
        res.redirect('/') 
    } else {
        res.render('pages/index', {products_data: await product_models.getOneCategorie(req.body.categories), categorie_data: await product_models.getAllProductCategories()});
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})





