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
    name: 'COMMAND_NAME',
    shortDesc : 'SHORT_COMMAND_DESCRIPTION_FOR_GLOBAL_HELP',
    longDesc: 'LONG_COMMAND_DESCRIPTION_FOR_HELP_COMMAND',
    usage: 'COMMAND_PARAM1_PARAM2_PARAM3',
    alias: 'VERY_SHORT_COMMAND',
    execute(message, args) {
        //WRITE_YOUR_CODE_HERE_BRO
    }
};