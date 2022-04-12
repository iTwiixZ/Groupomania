const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = (req,res,next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        req.bearerToken = jwt.verify(token, process.env.TOKEN);
        next();

    } catch (error){
        res.status(401).json({error: "Requête non authentifiée !"});
    }
};