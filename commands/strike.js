module.exports = {
  name: 'strike',
  description: 'Give a user a strike',
  execute(message, args, guild) {
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
    /**
     * @TODO: FOR TESTING PURPOSES ONLY REFACTOR FOR PROD
     **/

    // Get role from server
    const role = guild.roles.find(role => role.name === 'success')
    const offender = message.mentions.members.first()

    offender.addRole(role)
    message.channel.send(
      `${offender} you got a strike from ${message.author} for ${args
        .slice(1)
        .join(' ')}`
    )
  }
}
