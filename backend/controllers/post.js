const bcrypt = require('bcrypt'); //création d'un mot de passe hashé.

const models = require('../models');

const jwt = require('jsonwebtoken'); // création et vérification des tokens d'authentification.

const jwtUtils = require('../middleware/auth');


//Routes
module.exports = {

// Création d'un post.
    createPost: function(req, res) {
        //getting auth header.
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

        //Constants
        const TITLE_LIMIT = 2;
        const CONTENT_LIMIT = 4;
     
        //params.
        const post = JSON.parse(req.body.post);
        const title = post.title;
        const content = post.content;
        // mediaPost = le nom de l'image qui s'enregistre dans la bdd
        const mediaPost = req.file ? `${req.file.filename}` :  "";
        

        if (title == null || content == null) {
            return res.status(400).json({'error': 'toto missing parameters'});
        }

        if (title.length <=  TITLE_LIMIT || content.length <= CONTENT_LIMIT ) {
            return res.status(400).json({'error': 'invalid parameters'});
        }
        
        models.Post.create({
            title: title,
            content: content,
            media : mediaPost,
            userId: userId,
            dateAdd: Date.now()
        })
            .then(result => {
                res.status(201).json({
                    message:'Post created successfully !',
                    post: result,
                
                });
            })

            .catch(error => {
                res.status(500).json({
                    message: 'Something went wrong !',
                    error: error
                })
            });
},

// Obtenir un post.
    getOnePost: function (req, res) {
        
        models.Post.findOne({
            where: { id: req.body.id },
            order: [['id', 'DESC']], 
        }).then(result => {
            res.status(200).json(result);
        }).catch(error => {
            res.status(500).json({
                message: 'Something went wrong'
            });
        });
    },
    
    getAllPost: function (req, res) {
        models.Post.findAll({
            attributes: ["title",'content', 'media', 'userId', 'id', 'createdAt'],
           order:[[
                'id', 'DESC'
           ]]
            })
            .then(result => { res.status(200).json(result)})
            .catch(error => { res.status(400).json({ message: 'Something went wrong'
            });
        });
    },


    deletePost: function(req, res) {
        
        models.Post.findOne({
            where: {id: req.params.id},
        })
        .then( (post) => {
            post.destroy()
            .then(()=> { res.status(200).json({ message: "Post supprimé !"})})
            .catch((error)=> { res.status(400).json({ error: error, message:"Le post n'a pas pu être supprimé !"})})
        }
        )
        .catch((error) => {res.status(400).json({ error: error, message: "Une erreur est survenue" })});
    },

   
       
    
}