
// A simple model class 

class ShopProducts{
    
    getAllProducts(){
        let data_of_all_products = [{'id': 1, 'description': 'A nice looking chair.', 'rating': 4.5}, {'id': 2, 'description': 'A nice looking door.', 'rating': 3.8}, {'id': 3, 'description': 'A nice looking window.', 'rating': 5}]
        return data_of_all_products
    }

}

module.exports = ShopProducts 