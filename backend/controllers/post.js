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

exports.deletePost = async (req, res, next) => {
  const user = decodeUid(req.headers.authorization);
  const id = req.params.id;

  const userModel = await models.Users.findOne({
    where: { id: user.id },
  });

  const post = await models.Post.findOne({
    where: { id: id },
  });

  if (
    user.id == post.getDataValue("userId") ||
    userModel.getDataValue("isAdmin")
  ) {
    models.Post.findOne({ where: { id: id } })
      .then((post) => {
        post
          .destroy()
          .then(() => {
            res.status(200).json({ message: "Post supprimé !" });
          })
          .catch((error) => {
            res
              .status(400)
              .json({
                error: error,
                message: "Le post n'a pas pu être supprimé !",
              });
          });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  } else {
    res.status(403).json({ message: "Not authorized" });
    return;
  }
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
