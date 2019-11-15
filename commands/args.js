module.exports = {
  name: 'args',
  description: 'Information about the provided arguments',
  execute(message, args) {
    if (!args.length) {
      return message.channel.send(
        `You didn't provide any arguments, ${message.author}.`
      )
    } else if (args[0] === 'foo') {
      message.channel.send('bar')
    }

    message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`)
  }
}
