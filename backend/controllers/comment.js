const models = require('../models');
const { createPost } = require('./post');
const jwt = require('jsonwebtoken');

const decodeUid = (authorization) => {
    const token = authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    return {
        id: decodedToken.userId,
        
    };
};
// Méthode pour créer un commentaire 

exports.createComment = (res, req , next) => {
    
    const user    = decodeUid(req.headers.authorization):
    const content = req.body.content;
    const postId  = req.body.postId;
    const comment  ={
        userId: user.id,
        content: content.content,
        dateAdd: Date.now(),
        postId: postId
    }
};

// Supprimer un commentaire

exports.deleteComment = (req, res, next) => {
     models.Comment.findOne({
        where: {id: req.params.id},
    })
    .then( (comment) => {
        comment.destroy()
        .then(()=> { res.status(200).json({ message: "commentaire supprimé !"})})
        .catch((error)=> { res.status(400).json({ error: error, message:"Le commentaire n'a pas pu être supprimé !"})})
    }
    )
    .catch((error) => {res.status(400).json({ error: error, message: "Une erreur est survenue" })});
}
