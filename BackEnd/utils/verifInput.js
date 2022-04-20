// Fichier qui comprenant les différentes fonctions de vérification des inputs des utilisateurs
module.exports = {
    validEmail: function (value) {
        // Recherche toute combinaison de AZ (majuscules et minuscules) et de chiffres
        // Autorise quelques caractères spéciaux : ! # $ % & ' * + - / = ? ^ _ ` { |
        const regexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return regexEmail.test(value)
    },
    validPassword: function (value) {
        // Autorise 6 caractères dont au minimum une majuscule, une minuscule, un caractère numérique et un caractère spécial
        const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,250})/
        return regexPassword.test(value)
    },

        //
    validlogin: function (value) {
        const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
        return usernameRegex.test(value)
    }
}