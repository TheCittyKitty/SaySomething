const { REST, Routes } = require('discord.js');
require('dotenv').config();

const command = require('register-commands.js'); // change this to your actual command filename
const commands = [command.data.toJSON()];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log(`Registering ${commands.length} global slash command(s)...`);

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands },
    );

    console.log('Global slash commands registered.');
  } catch (error) {
    console.error(error);
  }
})();