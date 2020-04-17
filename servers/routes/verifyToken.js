const jwt= require('jsonwebtoken');
const dotenv= require('dotenv');
dotenv.config();

module.exports = function  (req,res,next) {
    console.log('inside the verification function');
    const token= req.header('auth-token');
    if(!token) {
        const sendData={
            status:401,
            err:'Access Denied'
        }
        return res.status(401).json(sendData)};


    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user= verified;
        next();
    } catch (error) {
        const sendData={
            status:401,
            err:'Invalid Token'
        }
        
        res.status(401).json(sendData);
    }

}