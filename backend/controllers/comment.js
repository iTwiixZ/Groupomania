const bcrypt = require('bcrypt'); //création d'un mot de passe hashé.

const User = require('../models/user');

const jwt = require('jsonwebtoken'); // création et vérification des tokens d'authentification.

const jwtUtils = require('../middleware/auth');

const models = require('../models')


//Routes
module.exports = {
    createComment: function(req, res) {
        //getting auth header.
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

        //params
        const content = req.body.content;
        const dateAdd = Date.now();
        const postId = req.body.postId;
        const mediaComment = req.file ? `${req.file.filename}` :  "";
        const comment = {
            content: content,
            userId: userId,
            postId: postId,
            media: mediaComment,
            dateAdd: dateAdd
        }

        if ( content == null) {
            return res.status(400).json({ 'error':'invalid parameter'});
        }

        console.log(comment);

        models.Comment.create(comment)
        .then(result => {
            res.status(201).json({
                message:'Comment created successfully !',
                comment: result
            });
        })

        .catch(error => {
            res.status(500).json({
                message: 'Something went wrong !',
                error: error
            })
        });
        

    },
    getComments: function (req, res) {
        models.Comment.findAll({
            where: { postId: req.params.postId },
            order: [['id', 'DESC']], 
        }).then(result => {
            res.status(200).json(result);
        }).catch(error => {
            res.status(500).json({
                message: 'Something went wrong'
            });
        });
    },
    

    getAllComment: function (req, res) {
        models.Comment.findAll({
           order:[[
                'createdAt', 'DESC'
           ]]
            }).then(result => {
            res.status(200).json(result);
        }).catch(error => {
            res.status(400).json({
                message: 'Something went wrong'
            });
        });
    },

    deleteComment: function(req, res) {
        
        models.Comment.findOne({
            where: {id: req.body.id},
        })
        .then( (comment) => {
            comment.destroy()
            .then(()=> { res.status(200).json({ message: "commentaire supprimé !"})})
            .catch((error)=> { res.status(400).json({ error: error, message:"Le commentaire n'a pas pu être supprimé !"})})
        }
        )
        .catch((error) => {res.status(400).json({ error: error, message: "Une erreur est survenue" })});
    },
}