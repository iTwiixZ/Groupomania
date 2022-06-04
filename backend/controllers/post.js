const fs = require('fs');
const jwt = require('jsonwebtoken');
const models = require('../models');

const decodeUid = (authorization) => {
    const token = authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, 'RAMDOM_TOKEN_SECRET');
    return {
        id: decodedToken.userId,
        clearance: decodedToken.account,
    };
};
// Méthode pour la création des posts
exports.createPost = (req, res, next) => {
    console.log('Post crée:', req.body.post);
    const post    = JSON.parse(req.body.post);
    const user    = decodeUid(req.headers.authorization);
    const media   = req.file ? `${req.file.filename}` : '';
    const title   = post.title;
    const content = post.content;

    if (title == null || content == null) {
        return res.status(400).json({error: 'Il manque quelque chose au post !'});
    }
        models.Post.create({
        title:   title,
        content: content,
        media:   media,
        userId:  user,
        dateAdd: Date.now()
    })
    .then(result => {
        res.status(201).json({
            message: 'Post crée avec succès', 
            post: result});
    })
    .catch(error => {
        res.status(500).json({
            message: 'Erreur innatendu',
            error: error
        })
    });

};

// Méthode pour supprimé un post

exports.deletePost = (req, res, next) => {
    models.Post.findOne({
        where: {id: req.params.id},
    })
    .then((post) => {
        post.destroy()
        .then(()=> { res.status(200).json({ message: "Post supprimé !"})})
        .catch((error)=> { res.status(400).json({ error: error, message:"Le post n'a pas pu être supprimé !"})})
    })
    .catch((error) => {res.status(400).json({ error: error, message: "Une erreur est survenue" })});
};

// Méthode pour récuperer un post
exports.getOnePost = (req, res, next) => {
    models.Post.findOne({
        where: {id: req.body.id},
        order:[['id', 'DESC']]
    }).then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({message: 'Erreur innatendu'});
    });
};

// Méthode pour récuperer tous les posts
exports.getAllPosts = (req, res, next) => {
    models.Post.findAll({
        attributes: ["title",'content', 'media', 'userId', 'id', 'createdAt'],
        order:      [['id','DESC']]
    })
    .then((result) => {res.status(200).json(result)})
    .catch((error) => {res.status(400).json({message: 'Erreur innatendu'});
    });
}
