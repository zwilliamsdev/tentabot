// Giphy API
const giphy = require('giphy-api')()

module.exports = {
  name: 'tentgif',
  description: 'Gets a random tentacle gif',
  execute(message, args) {
    console.log('Running tentgif')
    giphy
      .random({
        tag: 'tentacle',
        rating: 'r'
      })
      .then(res => {
        message.channel.send(res.data.url)
      })
  }
}
