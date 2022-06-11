const jwt = require('jsonwebtoken');

module.exports = {

    getAdmin: function(authorization) {
        const isAdmin = -1;
        const token = req.headers.authorization.split(' ')[1];
        if(token != null) {
            try {
                let decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
                if(jwtToken != null)
                isAdmin = decodedToken.isAdmin;
            } catch(err) { }
        }
        return isAdmin;
    },
};