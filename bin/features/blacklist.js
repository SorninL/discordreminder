/*
Require section
 */
const log = require('../utils/js/advLogs.js');
const discord = require('discord.js');
const mysql = require('mysql');

/*
Config section
 */
const config = require('../config/main.json');
const configHelp = require('../config/help.json');
const configColor = require('../config/colors.json');
const configEmbed = require('../config/embed.json');
const configSql = require('../config/mysql.json');

/*
Mysql connection
 */
let connection = mysql.createConnection({
   host: configSql.host,
   user: configSql.user,
   password: configSql.password,
   database: configSql.database
});

/*
Discord client setup
 */
const client = new discord.Client();

let pmBlackList = new Promise((resolve, reject) => {
    connection.connect(err=>{
        if (!err) {
            connection.query('SELECT word FROM blacklist', (err,rows, fields) => {
                connection.end();
                if (!err) {
                      if (!rows[0]) {
                          let sGo = 0;
                          let sResult = [];
                          for (let i=0; i < rows.length; i++) {
                              sResult.push(rows[i].word);
                              if (i>=rows.length) {
                                  sGo++
                              }
                          }
                          if (sGo > 0) {
                              resolve(sResult);
                          }
                      } else {
                          reject('MYSQL request returned no result.');
                      }
                } else {
                    reject('MYSQL request returned an error.');
                }
            });
        } else {
            reject('Connection to MYSQL database failed');
        }
    });
});


let wordChecker = async (message, args) => {
    let blackListArray;
    pmBlackList.then(
        result => {blackListArray = result},
        error => {log.superLogs('error', error)}
    );
    if (!blackListArray) {
        for (let i = 0; i < blackListArray.length; i++) {
            if (message.content.includes(blackListArray[i])) {
                let embed = new discord.MessageEmbed();
                embed.setAuthor(message.author.username);
                embed.addField('Mot interdit', 'Vous avez utilisé un mot qui apparait dans la blacklist.');
                embed.setThumbnail('https://i.gyazo.com/4042408f406b4d4be87ba1b49842ad2e.png');
                embed.setFooter(configEmbed.footer.default);
                message.author.send(embed);
            }
        }
    }
};




module.exports = {wordChecker};