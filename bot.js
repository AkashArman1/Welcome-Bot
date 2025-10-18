const { Client, Intents } = require('discord.js');

// Create Discord client
const client = new Client({
    intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS]
});

// 🔒 Use environment variable for security (set this in Render)
const token = process.env.DISCORD_TOKEN;

// Use your channel ID (replace or set via Render environment variable)
const WELCOME_CHANNEL_ID = process.env.WELCOME_CHANNEL_ID || 'YOUR_CHANNEL_ID_HERE';

console.log('Starting bot, please give me a second.');

client.on('ready', () => {
    console.log(`I am ready to welcome people as ${client.user.tag}!`);
});

client.on("guildMemberAdd", member => {
    WelcomeNewMember(member);
});

function WelcomeNewMember(member) {
    const welcomeMessage = `
**WELCOME TO DUDH DHAMAKA! 🥛✨**

👋 Welcome to **Dudh Dhamaka**, ${member} 🎉

We’re happy to have you here! ✨  
➡️ Check out <#rules> so you know the guidelines  
➡️ Grab your roles in <#roles> to unlock channels  
➡️ Say hi in <#general> and meet the community  

Enjoy your stay 🫦
`;

    client.channels.fetch(WELCOME_CHANNEL_ID)
        .then(channel => {
            setTimeout(() => {
                console.log("Welcoming a new member.");
                channel.send(welcomeMessage);
            }, 1000);
        })
        .catch(console.error);
}

client.login(token);
