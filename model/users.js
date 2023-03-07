import fetch from "node-fetch";

export default class Users{
    async userLoginVerification(userName, userPassword){
        let user_data
        try{
            await fetch('https://fakestoreapi.com/users').then(res => res.json()).then(data => user_data = data)
            let user_result = user_data.filter(data => data['username'] === userName && data['password'] === userPassword)
            if(user_result[0] === undefined){
                console.log('user name or password is incorrect')
                return undefined
            } else {
                console.log('Success')
                return user_result[0]['id']
            }
        }catch(error){
            console.log(error)
        }
    }

    async getRandomUser(){
        let user_data
        try{
            await fetch('https://fakestoreapi.com/users').then(res => res.json()).then(data => user_data = data)
            let listResult = Math.floor(Math.random() * (0, user_data.length - 1))
            let userResult = user_data[listResult]
            return userResult['id']
        }catch(error){
            console.log(error)
        }
    }
}