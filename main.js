require('module-alias/register')

// const Discord = require('discord.js')
// const client = new Discord.Client()

const MongoClient = require('mongodb').MongoClient
const MongoDBProvider = require('commando-provider-mongo').MongoDBProvider
const path = require('path')
const Commando = require('discord.js-commando')

const config = require('@root/config.json')
const command = require('@util/command')
const firstMessage = require('@util/first-message')
const roleClaim = require('@features/role-claim')
const welcome = require('@features/welcome')
const mongo = require('@util/mongo')
const loadCommands = require('@root/commands/load-commands')
const eval = require('@root/eval')
const commandBase = require("@root/commands/command-base")
const scalingChannels = require('@features/scaling-channels')
const loadFeatures = require('@root/features/load-features')

const client = new Commando.CommandoClient({
    owner: '488431862730063873',
    commandPrefix: config.prefix
})

client.setProvider(
    MongoClient.connect(config.mongoPath)
    .then(client => {
        return new MongoDBProvider(client, 'AstolfoCafe')
    })
    .catch((err) => {
        console.error(err)
    })
)

client.on('ready', async () => {
    console.log('The bot is online!')

    client.registry
        .registerGroups([
            ['misc', 'misc commands'],
            ['moderation', 'moderation commands'],
            ['giveaway', 'Commands to manage giveaways'],
            ['games', 'Commands to handle games'],
        ])
        .registerDefaults()
        .registerCommandsIn(path.join(__dirname, 'cmds'))


    await mongo()

    loadFeatures(client)

    eval(client)

    // loadCommands(client)

    // commandBase.loadPrefixes(client)

    scalingChannels(client)

    welcome(client)

    roleClaim(client)

})



client.login(process.env.TOKEN2)
