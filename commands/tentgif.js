// Giphy API
const giphy = require('giphy-api')()

module.exports = {
  name: 'tentgif',
  description: 'Gets a random tentacle gif',
  execute(message, args) {
    giphy
      .random({
        tag: 'tentacles',
        rating: 'r'
      })
      .then(res => {
        message.channel.send(res.data.url)
      })
  }
}
