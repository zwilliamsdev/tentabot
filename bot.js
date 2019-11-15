// Discord.js module
const Discord = require('discord.js')
// Client object
const client = new Discord.Client()
// Config stuffs
const { token, prefix, status } = require('./config/config.json')

// Once the bot is ready this will fire one time
client.once('ready', () => {
  // Identify the bots name and user ID
  console.log(`Logged in as ${client.user.tag} with ID ${client.user.id}`)
  // Set custom "playing" status
  client.user.setActivity(status)
})

// Ran whenever the bot sees a message in chat
client.on('message', message => {
  if (message.content === '!ping') {
    message.channel.send('Pong!')
  }
})

// Bot logs in with this token
client.login(token)
