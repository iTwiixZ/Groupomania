const fs = require("fs");
const jwt = require("jsonwebtoken");
const models = require("../models");

const decodeUid = (authorization) => {
  const token = authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  return {
    id: decodedToken.userId,
  };
};
// Méthode pour la création des posts
exports.createPost = (req, res, next) => {
  const post = JSON.parse(req.body.post);
  const user = decodeUid(req.headers.authorization);
  const title = post.title;
  const content = post.content;
  const media = req.file ? `${req.file.filename}` : "";

  const TITLE_LIMIT = 1;
  const CONTENT_LIMIT = 1;

  if (title == null || content == null || media == null) {
    return res.status(400).json({ error: "toto missing parameters" });
  }

  if (title.length <= TITLE_LIMIT || content.length <= CONTENT_LIMIT) {
    return res.status(400).json({ error: "invalid parameters" });
  }
  models.Post.create({
    title: title,
    content: content,
    media: media,
    userId: user.id,
    dateAdd: Date.now(),
  })
    .then((result) => {
      res.status(201).json({
        message: "Post crée avec succès",
        post: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Erreur innatendu",
        error: error,
      });
    });
};

// Méthode pour supprimé un post

exports.deletePost =  (req, res, next) => {
  // const userId = req.body.userId;
  const allowed = req.body.isAdmin;
  const userId = decodeUid(req.headers.authorization);
  const id = req.params.id;
  const post =  models.Post.findOne({
    where: { id: id }
  })
  .then((post) => {
    
    if (userId != post.userId) {
      res.status(403).json({ message: "Not authorized" });
      return;
    }
    
  
  
    models.Post.destroy({ where: { id: id } })
      .then((res) => {
        res.status(200).json({ message: "Post deleted successfully" });
      })
      .catch((error) => {
        res.status(500).json({ message: "Something went wrong" });
      });
  })
  .catch((error) => {
    res.status(500).json({ message: "Something went wrong" });
  });

};


// Méthode pour récuperer un post
exports.getOnePost = (req, res, next) => {
  models.Post.findOne({
    where: { id: req.body.id },
    order: [["id", "DESC"]],
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({ message: "Erreur innatendu" });
    });
};

// Méthode pour récuperer tous les posts
exports.getAllPosts = (req, res, next) => {
  models.Post.findAll({
    attributes: ["title", "content", "media", "userId", "id", "createdAt"],
    order: [["id", "DESC"]],
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(400).json({ message: "Erreur innatendu" });
    });
};
