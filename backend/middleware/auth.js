//Imports
const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'fghojpmolkjghfrtrzey346RTYU5678';//doit etre cacher dans un autre dossier avant d'envoyer sur github.

//Exported functions
module.exports = {
   generateTokenForUser: function(userData) {
       return jwt.sign({
           userId: userData.id,
           isAdmin: userData.isAdmin,
           
       },
       JWT_SIGN_SECRET,
       { expiresIn: '24h' }
       )
     },
     parseAuthorization: function(authorization) {
        const token = (authorization != null) ? authorization.replace('Bearer','') : null;
        return (token != null) ? token.trim() : null; //sup espace devant et derriere.no
     },
     getUserId: function(authorization) {
         var userId = -1;
         const token = module.exports.parseAuthorization(authorization);
         if(token != null){
         try {
             const jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
             if(jwtToken != null)
             userId = jwtToken.userId;
         } catch(err) { }
     }
     return userId;
    },

    getAdmin: function(authorization) {
        let isAdmin = -1;
        let token = module.exports.parseAuthorization(authorization);
        if(token != null) {
            try {
                let jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if(jwtToken != null)
                isAdmin = jwtToken.isAdmin;
            } catch(err) { }
        }
        return isAdmin;
    },

};