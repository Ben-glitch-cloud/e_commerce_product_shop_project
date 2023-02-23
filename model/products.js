import fetch from "node-fetch";
// A simple model class 

export default class ShopProducts{
    
    async getAllProducts(){
        let all_product_data 
        try{
            await fetch('https://fakestoreapi.com/products').then(res => res.json()).then(data => all_product_data = data)
            return all_product_data
        }catch(error){
            throw error
        }
    }

    async getAllProductCategories(){
        let all_categorie_data 
        try{
            await fetch('https://fakestoreapi.com/products/categories').then(res => res.json()).then(data => all_categorie_data = data)
            // adds the option to see all products again
            all_categorie_data.push('All Products')
            all_categorie_data.reverse()
            return all_categorie_data 
        }catch(error){
            throw error
        }
    }

    async getOneCategorie(categorie){
        let one_categorie 
        try{
            await fetch(`https://fakestoreapi.com/products/category/${categorie}`).then(res => res.json()).then(data => one_categorie = data)
            return one_categorie 
        }catch(error){
            throw error
        }
    }

    async getOneProduct(id_data){
        let single_product_data
        try{
            await fetch(`https://fakestoreapi.com/products/${id_data}`).then(res => res.json()).then(data => single_product_data = data)
            return single_product_data
        }catch(error){
            throw error
        }
    }   

}

// module.exports = ShopProducts 

// [
//     {
//       id: 1,
//       title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
//       price: 109.95,
//       description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
//       category: "men's clothing",
//       image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
//       rating: { rate: 3.9, count: 120 }
//     },