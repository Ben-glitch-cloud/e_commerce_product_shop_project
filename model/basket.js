import fetch from "node-fetch"; 

export default class Basket {

     async getUserBasket(user_id){
        let get_user_basket_data
        try{
            await fetch(`https://fakestoreapi.com/carts/user/${user_id}`).then(res => res.json()).then(data => get_user_basket_data = data)
            return get_user_basket_data
        }catch(error){
            throw error
        }
    }

    addItemsToBasket(product_id, quanity, basket){
        let no_product_id_found = false
        basket[0]['products'].forEach((item) => {
            if(item['productId'] === Number(product_id)){
                no_product_id_found = true
                return 
            }
        })
        if(no_product_id_found){
            basket[0]['products'].map((item) => item['productId'] === Number(product_id) ? item['quantity'] += Number(quanity) : item['quantity'])
        } else {
            basket[0]['products'].push({productId: Number(product_id), quantity: Number(quanity)})
        }
        return basket
    }

}