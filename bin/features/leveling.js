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


let giveMeLevels = (message, args) => {

};



module.exports = {giveMeLevels};