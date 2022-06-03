//Imports
const jwt = require('jsonwebtoken');
require('dotenv').config();

//Exported functions
module.exports = (req, res, next) => {
 try{
     const token = req.header.authorization.split(' ')[1];
     const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
     const userId = decodedToken.userId;
     if(req.body.userId && req.body.userId !== userId){
         throw 'Invalid user id';
     } else{
         next();
     }
 } catch {
     res.status(401).json({
         error: new Error('Invalid request !')
     });
 }


};