import DiscordJS, {ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, Client, EmbedBuilder, GatewayIntentBits, GuildMember, GuildTextBasedChannel, PermissionFlagsBits, REST, Routes, SlashCommandBuilder} from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const client = new Client({intents: [GatewayIntentBits.Guilds]});
const rest = new REST({version: '10'}).setToken(process.env.TOKEN!);

client.on('ready', () => console.log('bot ready'));
client.on('interactionCreate', interaction => {
    if(interaction.isChatInputCommand()) {
        switch (interaction.commandName) {
            case 'setup': {
                const channel = interaction.options.getChannel('channel') as GuildTextBasedChannel;
                channel.send({ 
                    embeds: [
                        new EmbedBuilder()
                            .setDescription('Welcome to the Server! PLease verify yourself')
                            .setColor('Navy')
                            .setTitle(`Welcome to ${interaction.guild?.name}`)
                    ],
                    components: [
                        new ActionRowBuilder<ButtonBuilder>().setComponents(
                            new ButtonBuilder()
                            .setCustomId('verifyMember')
                            .setLabel('Verify')
                            .setStyle(ButtonStyle.Primary)
                        ),
                    ]})
                break;
            }
        }
    } else if (interaction.isButton()){
        switch(interaction.customId) {
            case 'verifyMember': {
                console.log('Verifying member...');
                const role = interaction.guild?.roles.cache.get('1008791625515941998');
                if (!role) {
                    console.log('Role doesnt exist');
                    return;
                }
                const member = interaction.member as GuildMember;
                member.roles
                    .add(role)
                    .then(m => {
                        interaction.reply({
                            content: `The ${role} role was assigned to you.`,
                            ephemeral: true,
                        })
                    })
                    .catch((e) => {
                        interaction.reply({
                            content: `Something went wrong.`,
                            ephemeral: true,
                        })
                    });
                break;
            }
        }
    }
});
(async () => {
    try {
        await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!), {
            body: [
                new SlashCommandBuilder()
                    .setName('setup')
                    .setDescription('lalal')
                    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
                    .addChannelOption(option => 
                        option
                            .setName('channel')
                            .setDescription('ghvhk')
                            .addChannelTypes(ChannelType.GuildText))
            ],
        })
        await client.login(process.env.TOKEN)
    } catch(err) {
        console.log(err);
    }
})();
