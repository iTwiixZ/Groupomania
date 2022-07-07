//  const post = req.body.post;
//   const userId = decodeUid(req.headers.authorization);
//   const isAdmin = req.user.isAdmin;
//   if (userId === post.userId || isAdmin === true) {
//     models.Post.findOne({
//       where: { id: req.params.id },
//     })
//       .then((post) => {
//         post
//           .destroy()
//           .then(() => {
//             res.status(200).json({ message: "Post supprimé !" });
//           })
//           .catch((error) => {
//             res.status(400).json({
//               error: error,
//               message: "Le post n'a pas pu être supprimé !",
//             });
//           });
//       })
//       .catch((error) => {
//         res
//           .status(400)
//           .json({ error: error, message: "Une erreur est survenue" });
//       });
//   }





//     const userId = req.body.userId;
//   const allowed = req.body.isAdmin;
//   const token = decodeUid(req.headers.authorization);
//   const id = req.params.id;
//   const post = req.body.post;
//   if (!userId + !token || !post.userId) {
//     res.status(401).json({ message: "Not authorized" });
//     return;
//   }

//   // Admin autorisation

//   if (userId + token == post.userId) allowed = true;
//   if (!allowed) {
//     res.status(401).json({ message: "Not authorized" });
//     return;
//   }
//   models.Post.destroy({ where: { id: id } })
//     .then((res) => {
//       res.status(200).json({ message: "Post deleted successfully" });
//     })
//     .catch((error) => {
//       res.status(500).json({ message: "Something went wrong" });
//     });



//     exports.deleteComment = (req, res, next) => {
//   models.Comment.findOne({
//     where: { id: req.params.id },
//   })
//     .then((comment) => {
//       comment
//         .destroy()
//         .then(() => {
//           res.status(200).json({ message: "commentaire supprimé !" });
//         })
//         .catch((error) => {
//           res
//             .status(400)
//             .json({
//               error: error,
//               message: "Le commentaire n'a pas pu être supprimé !",
//             });
//         });
//     })
//     .catch((error) => {
//       res
//         .status(400)
//         .json({ error: error, message: "Une erreur est survenue" });
//     });
// };


// exports.deleteUser = (req, res, next) => {
//   const id = req.params.userId;
//   models.Users.findOne({
//     where: { id: id },
//   })
//     .then((user) => {
//       if (user) {
//         models.Users.destroy({
//           where: { id: id },
//         })
//           .then(() =>
//             res.status(200).json({ message: "Votre compte à été supprimé" })
//           )
//           .catch(() =>
//             res.status(500).json({ error: "Une erreur est survenue" })
//           );
//       } else {
//         return res.status(404).json({ message: "Utilisateur non trouvé" });
//       }
//     })
//     .catch((error) =>
//       res.status(500).json({ error: "Une erreur est survenue" })
//     );
// };