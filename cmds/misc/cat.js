const { default: axios } = require('axios')
const Commando = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')

module.exports = class CatCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'cat',
            group: 'misc',
            memberName: 'cat',
            description: 'Displays a random picture of a cat',
        })
    }

    run = async (message) => {
        axios.get('https://api.thecatapi.com/v1/images/search')
            .then((res) => {
                console.log('RES:', res.data[0].url)
                message.channel.send(res.data[0].url)
            })
            .catch((err) => {
                console.error('ERR:', err)
            })
    }
}