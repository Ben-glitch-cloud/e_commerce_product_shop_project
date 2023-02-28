import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import ProductModels from './model/products.js';
import Users from './model/users.js'
import Basket from './model/basket.js'

const app = express()
const port = 3000


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cookieParser())


app.use(bodyParser.json());

app.set('view engine', 'ejs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/public', express.static('public'));

let product_models = new ProductModels(); 
let users = new Users();
let basket = new Basket();

app.get('/', async function (req, res) {
    res.render('pages/index', {products_data: await product_models.getAllProducts(), categorie_data: await product_models.getAllProductCategories(), user_id: req.cookies.user_id, categorie_name: 'All Products'});
})

app.get('/product/:id', async function (req, res) {
    res.render('pages/product', {product_data: await product_models.getOneProduct(req.params.id)});
})

app.post('/', async function (req, res){
    if(req.body.categories === 'All Products'){ 
        res.redirect('/') 
    } else {
        res.render('pages/index', {products_data: await product_models.getOneCategorie(req.body.categories), categorie_data: await product_models.getAllProductCategories(), user_id: req.cookies.user_id, categorie_name: req.body.categories});
    }
})

app.get('/login', function(req, res){
    res.render('pages/login')
})

app.get('/basket', async function(req, res){
    let basket_user_data_only_id
    if(req.cookies['user_id'] !== undefined){
        basket_user_data_only_id = await basket.getUserBasket(req.cookies['user_id'])
    }
        const result = await Promise.all(basket_user_data_only_id[0]['products'].map(async (basket_item) => {
             basket_item['productData'] = await product_models.getOneProduct(basket_item['productId'])
             return basket_item
        }))

    res.render('pages/basket', {user_id: req.cookies['user_id'], basket_list: result})
})

app.get('/logout/:id', function(req, res){
    if(req.cookies.user_id !== undefined){
        res.clearCookie("user_id")
        console.log("You have logged out")
    }
    res.redirect('/')
})

app.post('/userlogin', async function (req, res){
    let user_result = await users.userLoginVerification(req.body.username, req.body.password);
    if(user_result !== undefined){
        res.cookie('user_id', user_result)
        res.redirect('/')
    } else {
        res.render('pages/login')
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})





