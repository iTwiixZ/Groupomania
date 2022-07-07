const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const models = require("../models");
const decodeUid = (authorization) => {
  const token = authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  return {
    id: decodedToken.userId,
  };
};
// Méthode pour l'inscription de l'utilisateur

exports.signup = (req, res, next) => {
  const body = JSON.parse(req.body.body);
  const name = body.name;
  const email = body.email;
  const password = body.password;

  // Vérifie que tous les champs sont complets
  if (
    email == null ||
    email == "" ||
    name == null ||
    name == "" ||
    password == null ||
    password == ""
  ) {
    return res
      .status(400)
      .json({ error: "Tous les champs doivent être renseignés" });
  }

  // Permet de controller la longueur du pseudo
  if (name.length <= 2 || name.length >= 15) {
    return res
      .status(406)
      .json({ error: "Le pseudo doit contenir entre 3 et 15 caractères" });
  }

  models.Users.findOne({
    attributes: ["email"],
    where: { email: email },
  })
    .then((userExist) => {
      if (!userExist) {
        bcrypt
          .hash(body.password, 10)
          .then((hash) => {
            const newUser = models.Users.create({
              name: name,
              email: email,
              password: hash,
              isAdmin: 0,
            });
            res.status(201).json({ message: "Votre compte a bien été créé !" });
          })
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ error });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// Méthode pour connecter l'utilisateur
exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body);
  try {
    models.Users.findOne({
      where: { email: email },
    })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "Utilisateur introuvable" });
        }
        bcrypt
          .compare(password, user.password)
          .then((valid) => {
            if (!valid) {
              return res
                .status(401)
                .json({ message: "Mot de passe incorrect" });
            }
            res.status(200).json({
              userId: user.id,
              name: user.name,
              isAdmin: user.isAdmin,
              token: jwt.sign(
                {
                  userId: user.id,
                },
                "RANDOM_TOKEN_SECRET",
                {
                  expiresIn: "24h",
                }
              ),
            });
          })
          .catch((error) => res.status(500).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  } catch (error) {
    console.log(error);
  }
};

// Méthode pour la deconnection de l'utilisateur

exports.logout = (req, res, next) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirects("/");
};

// Méthode pour la suppression du compte

exports.deleteUser = async (req, res, next) => {
  const user = decodeUid(req.headers.authorization);
  const id = req.params.userId;

  const userModel = await models.Users.findOne({
    where: { id: user.id },
  });

  const users = await models.Users.findOne({
    where: { id: id },
  });

  if (
    user.id == users.getDataValue("userId") ||
    userModel.getDataValue("isAdmin")
  ) {
    models.Users.findOne({ where: { id: id } })
      .then((user) => {
        user
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
        res.status(500).json({ message: "Something went wrong" });
      });
  } else {
    res.status(403).json({ message: "Not authorized" });
    return;
  }
};

// Méthode pour récuperer un utilisateur

exports.getOneUser = (req, res) => {
  models.Users.findOne({
    attributes: ["name", "email"],
    where: { id: req.body.id },
  })
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "Utilisateur non trouvé !" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Impossible de voir le profil !" });
    });
};

// Méthode pour récuperer tous les utilisateurs pour l'admin
exports.getAllUsers = (req, res) => {
  models.Users.findAll({ attributes: ["name", "email", "id"] })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(400).json({ message: "Something went wrong" });
    });
};
