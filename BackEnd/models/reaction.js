// Import du modèle "reaction" 
const connection = require('../config/db')

// Modèle "Like/Dislike"
const Reaction = function(reaction) {
    this.id = reaction.id,
    this.user_id = reaction.user_id,
    this.post_id = reaction.post_id,
    this.reactions = reaction.reactions
};

Reaction.like = (reactions, result) => {
    connection.query ("INSERT INTO reactions SET ?", reactions, (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(null, err);
                return;
            } else {
                console.log('Réaction postée !');
                result(null, {...reactions});
            }
        }
    )
};

Reaction.cancel = (req, result) => {
    console.log(req.body);
    connection.query (`DELETE FROM reactions WHERE user_id= ? AND post_id= ?;`, [req.body.user_id, req.body.post_id] , (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log('réaction supprimée');
        result(null, res);
    });
};

Reaction.getLikes = (post_id, result) => {

    connection.query(`SELECT * FROM reactions WHERE reactions = 1 and post_id= ${post_id}`, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        result(null, res);
    })
};

Reaction.getDislikes = (post_id, result) => {

    connection.query(`SELECT * FROM reactions WHERE reactions = 2 and post_id= ${post_id}`, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        result(null, res);
    })
};

module.exports = Reaction;