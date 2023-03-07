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

        if(basket.length === 0){
            basket.push({"id": null, "userId": null, "2020-03-01T00:00:02.000Z": null, "products": [{"productId": Number(product_id), "quantity": Number(quanity)}]})
            return basket
        }

        let no_product_id_found = false

        console.log(product_id, quanity, basket, 'see this data')
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

    deleteAllItemType(product_id, basket){
        const newBasket = basket[0]['products'].filter( function(item) {if(item['productId'] !== Number(product_id)){return item}})
        basket[0]['products'] = newBasket
        return basket
    }

    updateNumberInBasket(product_id, numberOfItems, basket){
        if(Number(numberOfItems) > 0){
            basket[0]['products'].map((item) => item['productId'] === Number(product_id) ? item['quantity'] = Number(numberOfItems) : item['quantity'])
        } else {
            const newBasket = basket[0]['products'].filter( function(item) {if(item['productId'] !== Number(product_id)){return item}})
            basket[0]['products'] = newBasket
        }
        return basket 
    }

    async numberOfItemsInBasket(user_id, stores_basket){

        let NumberOfItemInTheUserBasket = 0, userBasket

        if(user_id !== undefined && stores_basket === undefined){
            console.log('this funaction should be affoded if the cookie is found')
            userBasket = await this.getUserBasket(user_id)
        } else {
            userBasket = stores_basket
        }
        
        if(userBasket !== undefined && userBasket.length > 0){
            NumberOfItemInTheUserBasket = userBasket[0]['products'].reduce((a, b) => a + b['quantity'], 0)
        }

        return NumberOfItemInTheUserBasket
    }

}