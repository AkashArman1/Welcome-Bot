const { Client, Intents } = require('discord.js');

// Create Discord client
const client = new Client({
    intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS]
});

// 🔒 Environment variables (set these in Render)
const token = process.env.DISCORD_TOKEN;
const WELCOME_CHANNEL_ID = process.env.WELCOME_CHANNEL_ID || 'YOUR_CHANNEL_ID_HERE';
const WELCOME_ROLE_NAME = process.env.WELCOME_ROLE_NAME || 'Member'; // Role to assign
const DM_GIF_URL = process.env.DM_GIF_URL || 'https://media.giphy.com/media/3o7aCTfyhYawdOXcFW/giphy.gif'; // Optional DM GIF

console.log('Starting bot, please give me a second.');

client.on('ready', () => {
    console.log(`I am ready to welcome people as ${client.user.tag}!`);
});

client.on("guildMemberAdd", member => {
    WelcomeNewMember(member);  // server welcome
    AssignRole(member);         // role assignment
    SendDM(member);             // personal DM
});

// ✅ Welcome message in server with GIF
function WelcomeNewMember(member) {
    const welcomeEmbed = {
        color: 0xFFD700,
        title: `WELCOME TO DUDH DHAMAKA! 🥛✨`,
        description: `
👋 Welcome to **Dudh Dhamaka**, ${member} 🎉

We’re happy to have you here! ✨  
➡️ Check out <#📝-milk-etiquette> so you know the guidelines    
➡️ Say hi in <#〔💬〕only-chat> and meet the community  

Enjoy your stay 🫦
        `,
        image: {
            url: 'https://c.tenor.com/990MomrAHwEAAAAd/tenor.gif' // Replace with your GIF
        }
    };

    client.channels.fetch(WELCOME_CHANNEL_ID)
        .then(channel => {
            setTimeout(() => {
                console.log("Welcoming a new member with a GIF in the server.");
                channel.send({ embeds: [welcomeEmbed] });
            }, 1000);
        })
        .catch(console.error);
}

// ✅ Role assignment
function AssignRole("Dudh Family") {
    const role = Dudh Family.guild.roles.cache.get("1416494280624705648"); // paste your role ID here
    if (!role) {
        console.log(`Role "${WELCOME_ROLE_NAME}" not found!`);
        return;
    }

    member.roles.add(role)
        .then(() => console.log(`Added role "${role.name}" to ${member.user.tag}`))
        .catch(console.error);
}

// ✅ Personal DM
function SendDM(member) {
    const dmEmbed = {
        color: 0xFFD700,
        title: `Welcome to Dudh Dhamaka! 🎉`,
        description: `
Hi ${member} 👋

We’re thrilled to have you join our community! ✨  
➡️ Check the rules to stay in the loop    
➡️ Say hi in #〔💬〕only-chat and meet everyone  

Enjoy your stay 💫
        `,
        image: {
            url: DM_GIF_URL
        }
    };

    member.send({ embeds: [dmEmbed] })
        .then(() => console.log(`Sent DM to ${member.user.tag}`))
        .catch(err => console.log(`Could not DM ${member.user.tag}: ${err}`));
}

client.login(token);
