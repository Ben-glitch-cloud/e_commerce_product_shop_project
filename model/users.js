import fetch from "node-fetch";

export default class Users{
    async userLoginVerification(userName, userPassword){
        let user_data
        try{
            await fetch('https://fakestoreapi.com/users').then(res => res.json()).then(data => user_data = data)
            let user_result = user_data.filter(data => data['username'] === userName && data['password'] === userPassword)
            return user_result[0]['id']
        }catch(error){
            console.log(error)
        }
    }
}