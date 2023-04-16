//* All code logic related with SignUp and LogIn body request is here *//

id = 3

const users = [{
    id: 1,
    name: "Carlos",
    email: "carlos.sotod@sansano.usm.cl",
    password: "123"
},
{
    id:2,
    name:"Tomo",
    email: "tomoaki.iwaya@sansano.usm.cl",
    password: "momia es"
}]


//* Functions */

const getUserbyID = (id) => {
    const user = users.find((user) => (user.id === id))
    return user
}

const signUser = (u_name, u_email, u_password) => {
    //Check if user already in system by email
    const userExists = users.find( (user) => user.email === u_email)
    if(userExists !== undefined){
        return `Email ${u_email} already in use`
    }
    
    //Register in System
    let newUser = {
        id: id,
        name: u_name,
        email: u_email,
        password: u_password
    }
    id = id+1
    users.push(newUser)
    return `User Signed Up, user_id = ${newUser.id}`
}

const logUser = (u_email, u_password) => {
    //Check if user already in system by email
    const userExists = users.find( (user) => user.email === u_email)
    if(userExists === undefined){
        return `Email ${u_email} not valid`
    }

    //Check if password matches
    const passMatches = userExists.password === u_password
    if(!passMatches){
        return `Incorrect Password`
    }

    //Login Logic
    //...
    return "LogIn Success"
}

module.exports = {
    getUserbyID,
    signUser,
    logUser
}