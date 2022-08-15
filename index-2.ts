import DiscordJS, {Client, GatewayIntentBits} from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        // GatewayIntentBits.MessageContent
    ]
})

client.on('ready', () => {
    console.log('Bot is Ready')
})

// client.on('message', async message => {
//     if (message.content === 'ping') {
//         message.channel.send('pong')
//     }
// })
// client.on('interactionCreate', async interaction => {
// 	if (!interaction.isChatInputCommand()) return;

// 	if (interaction.commandName === 'ping') {
// 		await interaction.reply('Pong!');
// 	}
// });
client.on('message', msg => { // Message function
    if (msg.author.bot) return; // Ignore all bots
 
    if (msg.content.startsWith("ping")) { // When a player does '!ping'
      msg.reply("Pong!") // The bot will say @Author, Pong!
    }
 });
client.login(process.env.TOKEN)