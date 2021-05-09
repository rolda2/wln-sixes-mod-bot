const command = require('@util/command')
const ownerId = '488431862730063873' // my discord user ID

module.exports = (client) => {
  command(client, 'eval', (message) => {
    const { member, channel, content } = message

    if (member.id === ownerId) {
      const result = eval(content.replace('+eval ', ''))
      channel.send(result)
    }
  })
}
