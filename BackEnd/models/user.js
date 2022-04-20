const connection = require('./../config/db')

// Modèle user
class User {
    constructor(elt){
        this.id = elt.id ?? null
        this.login = elt.login ?? null
        this.password = elt.password ?? null
        this.email = elt.email ?? null
        this.birth = elt.birth ?? null
        this.user_city = elt.user_city ?? null
        this.role = elt.role ?? 'employee'
        this.img = elt.img ?? null
    }

    
}

// Création d'un utilisateur 
User.create = (user, callback )=>{
    connection.query(`INSERT INTO user (login, password, email) VALUES (?, ?, ?)`, [user.login, user.password, user.email], (err, results, fields) => {
        if(err){
            callback(err, null)
        }else{
            callback(null, results)
        }
    })

}
    // Connection d'un utilisateur
User.getOne = (email, result) => {
    connection.query(`SELECT * FROM user WHERE email = '${email}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res[0]);
    })
}

    // Mise à jour d'un profil utilisateur.

User.update = (id, user, result) => {
    connection.query (
        "UPDATE user SET login = ?, password = ?, email = ?, birth = ?, user_city = ?, img = IFNULL(?, img) WHERE id = ?",
        [user.login, user.password, user.email, user.birth, user.user_city, user.img, id],
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
            console.log('Votre profil à été mis à jour !');
            result(null, {id: id, ...user});
        }
    );
};

// Récupération de l'id pour l'affichage du profil
User.getOneId = (id, result) => {
    connection.query(`SELECT * FROM user WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('Utilisateur trouvé:', res[0]);
            result(null, res[0]);
            return;
        }

        // Utilisateur n'a pas été trouvé avec l'ID
        result({ kind: 'not_found' }, null);
    })
}

// Suppression d'un utilisateur

User.deleteUser = (id, result) => {
    connection.query("DELETE FROM user WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0){
            result({ kind: "not_found" }, null);
            return;
        }

        console.log('Votre compte a été supprimé !', id);
        result(null, res);
    });
};

module.exports = User;
