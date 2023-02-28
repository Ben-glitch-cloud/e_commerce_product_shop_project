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

}