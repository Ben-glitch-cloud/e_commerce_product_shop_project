import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import session from 'express-session';
import { fileURLToPath } from 'url';
import ProductModels from './model/products.js';
import Users from './model/users.js'

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
let private_user_id

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/public', express.static('public'));

let product_models = new ProductModels(); 
let users = new Users();

app.get('/', async function (req, res) {
    console.log(private_user_id, 'set session')
    res.render('pages/index', {products_data: await product_models.getAllProducts(), categorie_data: await product_models.getAllProductCategories(), user_id: private_user_id});
})

app.get('/product/:id', async function (req, res) {
    res.render('pages/product', {product_data: await product_models.getOneProduct(req.params.id)});
})

app.post('/', async function (req, res){
    if(req.body.categories === 'All Products'){ 
        res.redirect('/') 
    } else {
        res.render('pages/index', {products_data: await product_models.getOneCategorie(req.body.categories), categorie_data: await product_models.getAllProductCategories(), user_id: private_user_id});
    }
})

app.get('/login', function(req, res){
    res.render('pages/login')
})

app.get('/logout/:id', function(req, res){
    console.log(private_user_id, req.params.id)
    if(private_user_id == req.params.id){
        private_user_id = undefined;
    }
    res.redirect('/')
})

app.post('/userlogin', async function (req, res){
    let user_result = await users.userLoginVerification(req.body.username, req.body.password);
    if(user_result !== undefined){
        private_user_id = user_result
        console.log(private_user_id, 'set after')
        res.redirect('/')
    } else {
        res.render('pages/login')
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})





