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
    name: 'todolist',
    shortDesc : 'Manages the todolist',
    longDesc: 'Allows user to manager their todolist',
    usage: 'todolist',
    alias: 'tl',
    execute(message, args) {
        if (args[0] != null) {
            switch (args[0]) {
                case "add":
                    initAddEvent();
                    break;
                case "mark":
                    initMarkEvent();
                    break;
                case "display":
                    initDisplayEvent();
                    break;
                case "delete":
                    iniRemoveEvent();
                    break;
                case "edit":
                    iniEditEvent();
                    break;
                default:
                    sendTodolistDefaultEmbed();
                    break;
            }
        } else {
            sendTodolistDefaultEmbed();
        }

        function sendTodolistDefaultEmbed() {
            let embed = new discord.MessageEmbed()
              .setAuthor(message.author.username)
              .setTitle("Que faire avec la commande todolist ?")
              .addField('Ajouter un événement', 'Pour ce faire, utilise la commande comme ceci : `todolist add`, une série de question vous sera posées afin de valider l\'ajout de l\'événement')
              .addField('Marquer un événement', 'Pour ce faire, utilise la commande comme ceci : `todolist mark`, une série de question vous sera posées afin de valider le marquage de l\'événement')
              .addField('Afficher les événements en cours', 'Pour ce faire, utilise la commande comme ceci : `todolist display`, vous obtiendrez une liste des événement non marqué comme terminé')
              .addField('Supprimer un événement', 'Pour ce faire, utilise la commande comme ceci : `todolist delete`, une série de question vous sera posées afin de valider la suppression de l\'événement')
              .addField('Editer un événement', 'Pour ce faire, utilise la commande comme ceci : `todolist edit`, une série de question vous sera posées afin de valider l\'édition de l\'événement')
              .setFooter(configEmbed.footer.default);
            message.channel.send(embed);
        }
        function initAddEvent() {
            let embed = new discord.MessageEmbed()
              .setTitle("Ajoutez le titre de l'événement")
              .addField("Pour ajouter un titre", "Répondez à ce message durant les 3 prochaines minutes afin d'attribuer un titre à l'événement")
              .setColor(configColor.info)
              .setFooter(configEmbed.footer.default);
            message.channel.send(embed);
            message.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 10000}).then(collected => {
                if (collected.first() === undefined) {
                    message.channel.send("Vous avez pris trop de temps pour répondre ... Veuillez recommencer !");
                    return;
                } else {
                    promiseAddField().then().catch();
                }
            }).catch(() => {
                console.log("WOEW");
                message.channel.send("Vous avez pris trop de temps pour répondre ... Veuillez recommencer !");
            });
        }

        function promiseAddField() {
            return new Promise((resolve, reject) => {
                let embed = new discord.MessageEmbed()
                  .setTitle("Ajoutez le titre du champ")
                  .addField("Pour ajouter un titre", "Répondez à ce message durant les 3 prochaines minutes afin d'attribuer un titre au champ")
                  .setColor(configColor.info)
                  .setFooter(configEmbed.footer.default);
                message.channel.send(embed);
                message.channel.awaitMessages(m => m.author.id === message.author.id, {
                    max: 1,
                    time: 10000
                }).then(collected => {
                    let secondEmbed = new discord.MessageEmbed()
                      .setTitle("Ajoutez le texte du champ")
                      .addField("Pour le texte du champ", "Répondez à ce message durant les 3 prochaines minutes afin d'attribuer le texte du champ")
                      .addField("Titre de l'événement", collected.first().content)
                      .setColor(configColor.info)
                      .setFooter(configEmbed.footer.default);
                    message.channel.send(secondEmbed);
                    message.channel.awaitMessages(m => m.author.id === message.author.id, {
                        max: 1,
                        time: 10000
                    }).then(collected => {
                        let thirdEmbed = new discord.MessageEmbed()
                          .setTitle("Voulez vous ajouter un autre champ ?")
                          .addField("👍 ou 👎", "Cliquez sur la réaction correspondant à votre réponse")
                          .setColor(configColor.info)
                          .setFooter(configEmbed.footer.default);
                        message.channel.send(thirdEmbed).then(msg => {
                            msg.react("👍");
                            msg.react("👎");
                            msg.awaitReactions((reaction, user) => user.id === message.author.id && (reaction.emoji.name === '👍' || reaction.emoji.name === '👎'),
                              {max: 1, time: 10000}).then(reactCollected => {
                                if (reactCollected.first().emoji.name === '👍') {
                                    resolve();
                                    promiseAddField().then().catch();
                                } else {
                                    resolve();
                                }
                            })
                        })

                    }).catch(() => {
                        reject();
                    });
                }).catch(() => {
                    reject();
                });
            }).then(data => {
                if (!data.next) {
                    needNewField = !needNewField;
                }
            }).catch(() => {
                message.channel.send("Vous avez pris trop de temps pour répondre ... Veuillez recommencer !");
            })
        }

        function initMarkEvent() {
            testEventType();
        }
        function initDisplayEvent() {
            message.channel.send("display");
        }
        function iniRemoveEvent() {
            message.channel.send("delete");
        }
        function iniEditEvent() {
            message.channel.send("edit");
        }

        function testEventType() {
            let embed = new discord.MessageEmbed()
              .setTitle("Faire les courses")
              .addField("Liste de course", "• Briques de laits\n" +
                "• Pain\n" +
                "• Eau\n" +
                "• Bières\n" +
                "• Steak\n")
              .addField("Status", "WIP")
              .addField("Doit être fait avant", "26/06/2020")
              .setFooter(configEmbed.footer.default)
              .setColor(configColor.warning);
            message.channel.send(embed);
        }
    }
};