const models = require("../models");
const jwt = require("jsonwebtoken");

const decodeUid = (authorization) => {
  const token = authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  return {
    id: decodedToken.userId,
  };
};
// Méthode pour créer un commentaire

exports.createComment = (req, res, next) => {
  const user = decodeUid(req.headers.authorization);
  let commentBody = JSON.parse(req.body.comment);
  const content = commentBody.content;
  const postId = commentBody.postId;
  const dateAdd = Date.now();
  const comment = {
    content: content,
    userId: user.id,
    postId: postId,
    dateAdd: dateAdd,
  };

  if (content == null) {
    return res.status(400).json({ error: "invalid parameter" });
  }

  console.log(comment);

  models.Comment.create(comment)
    .then((result) => {
      res.status(201).json({
        message: "Comment created successfully !",
        comment: result,
      });
    })

    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong !",
        error: error,
      });
    });
};

// Supprimer un commentaire

exports.deleteComment = (req, res, next) => {
  const userId = req.body.userId;
  const allowed = req.body.isAdmin;
  const token = decodeUid(req.headers.authorization);
  const id = req.params.id;
  const comment = req.body.comment;

  if (!allowed || userId != comment.userId) {
    res.status(401).json({ message: "Not authorized" });
    return;
  }


  models.Comment.destroy({ where: { id: id } })
    .then((res) => {
      res.status(200).json({ message: "Comment deleted successfully" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Something went wrong" });
    });
};

// Récupérer tous les commentaires

exports.getComments = (req, res, next) => {
  models.Comment.findAll({
    where: { postId: req.params.postId },
    order: [["id", "DESC"]],
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
};
