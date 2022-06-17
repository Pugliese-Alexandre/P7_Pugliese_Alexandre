// Import du modèle "comment"
const connection = require('./../config/db')

// Modèle "Comment"
class Comment {
    constructor(comment){
        this.id = comment.id,
        this.date = comment.date,
        this.comment = comment.comment,
        this.user_id = comment.user_id,
        this.post_id = comment.post_id
};
}

// Création d'un commentaire
Comment.create = (newComment, result) => {
    connection.query("INSERT INTO comment SET ?", newComment, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        console.log('Le commentaire a été posté !');
        result(null, {id: res.id, ...newComment});
    })
};

// Suppression d'un commentaire
Comment.delete = (id, result) => {
    connection.query("DELETE FROM comment WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0){
            // Commentaire n'a pas été trouvé avec l'id.
            result({ kind: "not_found" }, null);
            return;
        }

        console.log('Le commentaire a été supprimé.');
        result(null, res);
    });
};

module.exports = Comment;

