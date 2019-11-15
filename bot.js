// Discord.js module
const Discord = require('discord.js')
// fs module for filesystem access
const fs = require('fs')
// Config stuffs
const { token, prefix, status } = require('./config/config.json')

// Client object
const client = new Discord.Client()
// Client command collection
client.commands = new Discord.Collection()

// Array of command file names
const commandFiles = fs
  .readdirSync('./commands')
  .filter(file => file.endsWith('.js'))

// Loop through all files and add to array of commands
for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
}

// Once the bot is ready this will fire one time
client.once('ready', () => {
  // Identify the bots name and user ID
  console.log(`Logged in as ${client.user.tag} with ID ${client.user.id}`)
  // Set custom "playing" status
  client.user.setActivity(status)
})

// Ran whenever the bot sees a message in chat
client.on('message', message => {
  // If message contains the word tentacle
  if (
    message.content.includes('tentacle') ||
    message.content.includes('tentacles')
  ) {
    message.react('😏')
  }

  // If message does not start with the prefix or is the bot speaking end execution
  if (!message.content.startsWith(prefix) || message.author.bot) return

  // split spaces out of the message to get arguments
  const args = message.content.slice(prefix.length).split(/ +/)
  // everything after the first word are the arguments
  const commandName = args.shift().toLowerCase()

  // if the command does not exist stop execution
  if (!client.commands.has(commandName)) return

  // Get the command from the command collection
  const command = client.commands.get(commandName)

  // try to execute the command if it fails tell the user an error occured
  try {
    command.execute(message, args)
  } catch (error) {
    console.error(error)
    message.reply('An error occured processing your command.')
  }
})

// Bot logs in with this token
client.login(token)
