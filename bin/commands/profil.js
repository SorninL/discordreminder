/*
Require section
 */
const log = require('../utils/js/advLogs.js');
const discord = require('discord.js');

/*
Config section
 */
const config = require('../config/main.json');
const configHelp = require('../config/help.json');
const configColor = require('../config/colors.json');
const configEmbed = require('../config/embed.json');


/*
Discord client setup
 */
const client = new discord.Client();

/*
Command object
 */
module.exports = {
    name: 'profil',
    shortDesc : 'Affiche le profil',
    longDesc: 'Cette commande permet d\'afficher son propre profil ou celui d\'un autre utilisateur.',
    usage: 'Pour afficher le profil d\'un autre utilisateur, c\'est avec ce format de commande : `\' +config.prefix+ \'profil @user`\n' +
        'Pour afficher son propre profil la commande est : `'+config.prefix+'profil`.',
    alias: 'p',
    execute(message, args) {
        //WRITE_YOUR_CODE_HERE_BRO
    }
};