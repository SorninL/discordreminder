/*
Require section
 */
const log = require('../utils/js/advLogs.js');
const checkAdmin = require('../utils/js/checkAdmin.js');
const discord = require('discord.js');
//wsh c'est un test car mes potes me croient pas que je peux coder sur ton fichier
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
    name: 'blacklist',
    shortDesc : 'Permet de gérer la blacklist',
    longDesc: 'Permet de gérer la blacklist simplement. Reservé aux modérateurs',
    usage: '`blacklist add le_mot` : Ajoute un mot à la blacklist',
    alias: 'VERY_SHORT_COMMAND',
    execute(message, args) {
        if (checkAdmin(message.author.id, 'admin') !== false) {
            switch (args[0]) {
                case 'add':

                    break;
                case 'remove' :

                    break;
                case 'disable' :

                    break;
                case 'enable' :

                    break;
                default:

                    break;
            }
        }
    }
};