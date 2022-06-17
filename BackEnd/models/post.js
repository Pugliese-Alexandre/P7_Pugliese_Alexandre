// Import du modèle "Post"
const connection = require('./../config/db')

// Modèle Post
class Post {
    constructor(post){
        this.id = post.id,
        this.title = post.title,
        this.Contenu = post.Contenu,
        this.Contenu_court = post.Contenu_court,
        this.user_id = post.user_id
    }   
}

// Création d'un post
Post.create = (newPost, result) => {
    connection.query("INSERT INTO post SET ?", newPost, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        console.log('Article créé !');
        result(null, {id: res.id, ...newPost});
    })
};

// Mise à jour d'un post
Post.update = (id, post, result) => {
    connection.query (
        "UPDATE post SET title = ?, Contenu = ?, Contenu_court = ?, user_id = ? WHERE id = ?",
        [post.title, post.Contenu, post.Contenu_court, post.user_id, post.id],
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: 'not_found'}, null);
                return;
            }
            console.log('Article mis à jour !', { id: id, ...post });
            result(null, {id: id, ...post});
        }
    );
};

// Suppression d'un post
Post.delete = (id, result) => {
    connection.query("DELETE FROM post WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0){
            // L'article n'a pas été trouvé avec l'id.
            result({ kind: "not_found" }, null);
            return;
        }
        
        console.log('L article a été supprimé.');
        result(null, res);
    });
};

module.exports = Post;