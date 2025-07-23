const jwt = require("jsonwebtoken");

const generateToken = (id)=> {
    return jwt.sign({id} , "arpit1234" , {
        expiresIn: "40d"
    })
}

module.exports = generateToken;