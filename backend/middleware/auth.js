const jwt = require('jsonwebtoken')
const models = require('../models');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
		const user = await models.User.findOne({ where: { id: decodedToken.userId } });
		if (!user) {
			throw new Error("invalid");
		}
		req.user = user;
		next();
  }
  catch (error) {
    res.status(401).json({
      error: new Error('Requête non authentifiée !')
    })
  }
}