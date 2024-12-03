const jwt = require('jsonwebtoken');

const generateToken =(id) =>{
    const token =  jwt.sign({id}, process.env.JWT_SECRET_KEY, {
        expiresIn : "30h",
    });
    
    return token;
}

module.exports = generateToken;