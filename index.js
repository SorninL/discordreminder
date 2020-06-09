/*
Requires section
 */
const log = require('./bin/utils/js/advLogs.js');
const fs = require('fs');
const discord = require('discord.js');

/*
Config section
 */
const config = require('./bin/config/main.json');
const configHelp = require('./bin/config/help.json');
const configColor = require('./bin/config/colors.json');
const configEmbed = require('./bin/config/embed.json');

log.startLogs(); // Display the starting logs

const client = new discord.Client(); //Setup Discord client

/*
Setup the dynamic command finder
 */
client.commands = new discord.Collection();
const commandFiles = fs.readdirSync("./bin/commands/");
const commandArray = [];
let commandCount = 0;

for (const file of commandFiles) {
    const command = require("./bin/commands" + `/${file}`);
    client.commands.set(command.name, command);

    if ((command.name !== 'COMMAND_NAME') || (command.shortDesc !== 'SHORT_COMMAND_DESCRIPTION_FOR_GLOBAL_HELP') || (command.longDesc !== 'LONG_COMMAND_DESCRIPTION_FOR_HELP_COMMAND') || (command.usage !== 'COMMAND_PARAM1_PARAM2_PARAM3') || (command.alias !== 'VERY_SHORT_COMMAND')) {
        commandArray.push({
            commandName : command.name,
            commandShortDesc : command.shortDesc,
            commandLongDesc : command.longDesc,
            commandUsage: command.usage,
            commandAlias: command.alias
        });
        log.superLogs('success', 'Added command ' + command.name);
        commandCount++;
    } else {
        if (file === 'COPY_ME') {
            log.superLogs('success', 'Template command successfully ignored.');
        } else {
            log.superLogs('warning', 'Unfinished command. Please check the file named ' + file);
        }
    }
}

/*
Once the client is ready
 */
client.once('ready', () => {
    client.user.setActivity(config.activity + ' | prefix : ' + config.prefix).then(() => {
        log.superLogs('info', 'Bot activity is set to : ' + config.activity + ' | prefix : ' + config.prefix);
        log.superLogs('success', 'DONE - The bot is ready to go hf !');
    });
});


/*
Called on message
 */
client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    switch (command) {
        case "help":
            client.commands.get('help').execute(message, args, commandArray, commandCount);
            break;
        case "todolist":
            client.commands.get('todolist').execute(message, args);
            break;
        case "TYPE_HERE":
            client.commands.get('COMMAND_NAME').execute(message, args);
            break;
    }
});

client.login(config.token).then(() => {
   log.superLogs('success', 'Discord client successfully logged in');
}).catch(() => {
    log.superLogs('error', 'Discord client can not log in, please check the validity of the token you entered.')
});