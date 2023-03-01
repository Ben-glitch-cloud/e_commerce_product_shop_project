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
   
    if(req.cookies['user_id'] === undefined){
        res.render('pages/basket', {user_id: req.cookies['user_id'], basket_list: []})
    }

    if(req.cookies['user_id'] !== undefined && req.cookies.user_basket === undefined){
        console.log('this funaction should be affoded if the cookie is found')
        basket_user_data_only_id = await basket.getUserBasket(req.cookies['user_id'])
    } else {
        basket_user_data_only_id = req.cookies.user_basket
    }

    if(res.cookie.user_basket === undefined){
        res.cookie('user_basket', basket_user_data_only_id)
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
        res.clearCookie("user_basket")
        console.log("You have logged out")
    }
    res.redirect('/')
})

app.post('/userlogin', async function (req, res){
    let user_result = await users.userLoginVerification(req.body.username, req.body.password), basket_user_data_only_id
    if(user_result !== undefined){
        res.cookie('user_id', user_result)
        // basket_user_data_only_id = await basket.getUserBasket(req.cookies['user_id'])
        // res.cookie('user_basket', basket_user_data_only_id)
        res.redirect('/')
    } else {
        res.render('pages/login')
    }
})

app.post('/add_product_to_basket/:id', function(req, res){
    console.log(req.cookies['user_basket'], 'can be read')
    let result = basket.addItemsToBasket(req.params.id, req.body.product_puantity, req.cookies['user_basket'])
    res.cookie('user_basket', result)
    res.redirect(`/product/${req.params.id}`)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})





