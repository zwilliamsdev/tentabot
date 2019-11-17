// Giphy API
const giphy = require('giphy-api')()

module.exports = {
  name: 'gif',
  description: 'Gets a gif based on args',
  execute(message, args) {
    if (args.length == 0) {
      giphy
        .random({
          tag: '',
          rating: 'r'
        })
        .then(res => {
          message.channel.send(res.data.url)
        })
    } else if (args.length > 1) {
      message.channel.send(
        `${message.author} I can only accept single word searches at this time!`
      )
      return
    } else {
      giphy
        .random({
          tag: args,
          rating: 'r'
        })
        .then(res => {
          message.channel.send(res.data.url)
        })
    }
  }
}
