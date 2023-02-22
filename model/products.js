import fetch from "node-fetch";
// A simple model class 

export default class ShopProducts{
    
    async getAllProducts(){

        let all_product_data 

        try{
            await fetch('https://fakestoreapi.com/products').then(res => res.json()).then(data => all_product_data = data)
            console.log(all_product_data)
            return all_product_data
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