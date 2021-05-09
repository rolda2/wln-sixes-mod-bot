const { MessageEmbed } = require('discord.js')
const Commando = require('discord.js-commando')
const { version } = require('@root/package.json')

module.exports = class BotInfoCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'botinfo',
            group: 'misc',
            memberName: 'botinfo',
            description: 'Displays the bot information.'
        })
    }

    run = async (message) => {
        let totalMembers = 0

        for (const guild of this.client.guilds.cache) {
            totalMembers += (await guild[1].members.fetch()).size
        }

        const embed = new MessageEmbed()
            .setAuthor(`Information about the ${this.client.user.username} Bot`, this.client.user.displayAvatarURL()
            )
            .addFields(
            {
                name: 'Bot tag',
                value: this.client.user.tag,
                inline: 'true'
            },
            {
                name: 'Version',
                value: version,
                inline: 'true'
            },
            {
                name: "Server's command prefix",
                value: message.guild.commandPrefix,
                inline: 'true'
            },
            {
                name: 'Time since last restart',
                value: `${process.uptime().toFixed(2)}s`,
                inline: 'true'
            },
            {
                name: 'Server count',
                value: this.client.guilds.cache.size,
                inline: 'true'
            },
            {
                name: 'Total members',
                value: totalMembers,
                inline: 'true'
            },
        )

        message.channel.send(embed)
    }
}