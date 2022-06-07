const models = require('../models')


// Méthode pour créer un commentaire 

exports.createComment = (res, req , next) => {
    const content = JSON.parse(req.body.comment);
    const userId  = req.user.id;
    const dateAdded = Date.now();
    const comment = {
        content: content.content,
        userId: userId,
        postId: content.postId,
        dateAdded: dateAdded
    }

    if ( content == null) {
        return res.status(400).json({ error: 'Il manque quelque chose !'});
    }
    console.log(comment);

    models.Comment.create(comment)
    .then(result => {
        res.status(200).json({message: 'Commentaire créer avec succès', comment: result});
    })
    .catch(err => {
        res.status(500).json({message: 'Une erreur est survenue', error: err})
    });
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
