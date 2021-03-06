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

exports.deleteComment = async (req, res, next) => {
  const user = decodeUid(req.headers.authorization);
  const id = req.params.id;

  const userModel = await models.Users.findOne({
    where: { id: user.id },
  });

  const comment = await models.Comment.findOne({
    where: { id: id },
  });

  if (
    user.id == comment.getDataValue("userId") ||
    userModel.getDataValue("isAdmin")
  ) {
    models.Comment.findOne({ where: { id: id } })
      .then((comment) => {
        comment
          .destroy()
          .then(() => {
            res.status(200).json({ message: "commentaire supprimé !" });
          })
          .catch((error) => {
            res
              .status(400)
              .json({
                error: error,
                message: "Le commentaire n'a pas pu être supprimé !",
              });
          });
      })
      .catch((error) => {
        res.status(500).json({ message: "Something went wrong" });
      });
  } else {
    res.status(403).json({ message: "Not authorized" });
    return;
  }
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
