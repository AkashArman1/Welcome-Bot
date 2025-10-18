const { Client, Intents } = require('discord.js');

// Create Discord client
const client = new Client({
    intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS]
});

// 🔒 Use environment variables (set these in Render)
const token = process.env.DISCORD_TOKEN;
const WELCOME_CHANNEL_ID = process.env.WELCOME_CHANNEL_ID || 'YOUR_CHANNEL_ID_HERE';

console.log('Starting bot, please give me a second.');

client.on('ready', () => {
    console.log(`I am ready to welcome people as ${client.user.tag}!`);
});

client.on("guildMemberAdd", member => {
    WelcomeNewMember(member);
});

// ✅ Welcome function with GIF
function WelcomeNewMember(member) {
    const channelId = WELCOME_CHANNEL_ID;

    // Create an embed message
    const welcomeEmbed = {
        color: 0xFFD700, // optional color
        title: `WELCOME TO DUDH DHAMAKA! 🥛✨`,
        description: `
👋 Welcome to **Dudh Dhamaka**, ${member} 🎉

We’re happy to have you here! ✨  
➡️ Check out <#rules> so you know the guidelines  
➡️ Grab your roles in <#roles> to unlock channels  
➡️ Say hi in <#general> and meet the community  

Enjoy your stay 🫦
        `,
        image: {
            url: 'https://c.tenor.com/990MomrAHwEAAAAd/tenor.gif' // Replace with your own GIF if you want
        }
    };

    client.channels.fetch(channelId)
        .then(channel => {
            setTimeout(() => {
                console.log("Welcoming a new member with a GIF.");
                channel.send({ embeds: [welcomeEmbed] });
            }, 1000);
        })
        .catch(console.error);
}

client.login(token);
