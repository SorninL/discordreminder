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
    name: 'help',
    shortDesc : 'Affiche les commandes disponibles',
    longDesc: 'Permet d\'afficher les commandes disponibles, de détailler chaques commandes et d\'obtenir des informations utiles concernant plusieurs sujets.',
    usage: 'Information générale : '+config.prefix+ 'help\nInformations sur une commande : '+ config.prefix +'help nom_commande',
    alias: 'h',
    execute(message, args, commandArray, commandCount) {
        if (!args[0]) {
            let embed = new discord.MessageEmbed();
            embed.setThumbnail('https://i.gyazo.com/6769ce74936ef0b555d94acb44dd0d52.png');
            embed.setAuthor(configHelp.title);
            embed.addField('Commandes chargées', commandCount + ' commandes.');
            for (let i = 0; i < commandArray.length; i++) {
                embed.addField(config.prefix+commandArray[i].commandName, commandArray[i].commandShortDesc);
            }
            embed.setColor(configColor.info);
            embed.setFooter(configEmbed.footer.default);
            setTimeout(()=> {
                message.delete();
                let embed = new discord.MessageEmbed();
                embed.setAuthor(message.author.username);
                embed.addField('Commande help', 'Tu as reçu un MP de ma part avec le résultat de la commande help !');
                embed.setFooter(configEmbed.footer.default);
                message.channel.send(embed).then(msg => {
                    setTimeout(()=>{
                        msg.delete();
                    }, 7000)
                });
            }, 1000);
            message.author.send(embed);
        }
    }
};