const { MessageEmbed } = require('discord.js')
const Commando = require('discord.js-commando')

module.exports = class UserInfoCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'userinfo',
            group: 'misc',
            memberName: 'userinfo',
            description: 'Displays information about a user'
        })
    }

    run = async (message) => {
        const { guild, channel } = message
        const user = message.mentions.users.first() || message.member.user
        const member = guild.members.cache.get(user.id)

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setAuthor(`User info for ${user.username}`, user.displayAvatarURL())
            .addFields(
        {
            name: 'User tag',
            value: user.tag
        }, 
        {
            name: 'Is bot',
            value: user.bot
        },
        {
            name: 'Nickname',
            value: member.nickname || 'None'
        },
        {
            name: 'Joined server',
            value: new Date(member.joinedTimestamp).toLocaleDateString()
        },
        {
            name: 'Joined Discord',
            value: new Date(user.createdTimestamp).toLocaleDateString()
        },
        {
            name: 'Role count',
            value: member.roles.cache.size - 1
        },
        )

        channel.send(embed)
    }
}