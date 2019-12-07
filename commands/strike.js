require('dotenv').config()
const Discord = require('discord.js')

module.exports = {
  name: 'strike',
  description: 'Give a user a strike',
  execute(message, args, guild) {
    // @TODO: Check for administrative privileges and do not allow members to issue strikes
    // @TODO: Do not allow moderators to strike other moderators

    // check if a user was mentioned
    if (!message.mentions.users.size)
      return message.channel.send(
        `${message.author} you must tag a user to strike them.`
      )
    // Only allow striking one member at a time
    if (message.mentions.users.size > 1)
      return message.channel.send(
        `${message.author} you may only strike one member at a time.`
      )

    if (args.length < 2)
      return message.channel.send(
        `${message.author} you must provide a reason for the strike! Ex: strike @user reason`
      )

    // @TODO: Fix getting channel via a passed function to fix deprecation warning
    // Get channel from server
    // const channel = guild.channels.find(
    //   channel => channel.name === process.env.ACTION_CHANNEL
    // )
    const offender = message.mentions.members.first()

    const strikeEmbed = new Discord.RichEmbed()
      .setColor('#ff0000')
      .setTitle('Strike Issued')
      .setAuthor('TentaBotDev')
      .setThumbnail('https://i.imgur.com/IvTbcrY.jpg')
      .setDescription('A staff member has issued a strike against a member.')
      .addField('Offending User', offender, false)
      .addField('Reason for strike', args.slice(1).join(' '), false)
      .addField('Struck By', message.author, false)

    guild.channels.find('name', process.env.ACTION_CHANNEL).send(strikeEmbed)
  }
}
