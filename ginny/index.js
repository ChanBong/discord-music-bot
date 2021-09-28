const Discord = require('discord.js')
const Client = require('./client/Client');
const client = new Client();

bot_secret_token = "ODkyMzcwODc0MDg1MzA2Mzk5.YVL7Iw.EGpaw1NukxVckrDEFLioihg4X-A"

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)

    console.log("Servers: ")
    client.guilds.cache.forEach((guild) => {
        console.log(" - ", guild.name)

        guild.channels.cache.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
        })

        var bot_test = guild.channels.cache.get('875049468788097074')
        bot_test.send("Hello Neo!")

        console.log(client.user.username.toString())
        console.log(client.user.toString())
        //guild.members.fetch().then(console.log).catch(console.error);

    })
})

client.on('message', (receivedMessage) => {
    // Prevent bot from responding to its own messages
    if (receivedMessage.author == client.user) {
        return
    }

    console.log(receivedMessage.content)

    if (receivedMessage.content.includes('<@!892370874085306399>')) {
        // Send acknowledgement message
        receivedMessage.channel.send("Message received from " + receivedMessage.author.toString() + ": " + receivedMessage.content)
    }

})

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return
    }

    // You can copy/paste the actual unicode emoji in the code (not _every_ unicode emoji works)
    receivedMessage.react("892388074498187295")
    receivedMessage.react("🛐")
    // Unicode emojis: https://unicode.org/emoji/charts/full-emoji-list.html

    // Get every custom emoji from the server (if any) and react with each one
    // receivedMessage.guild.emojis.cache.forEach(customEmoji => {
    //     console.log(`Reacting with custom emoji: ${customEmoji.name} (${customEmoji.id})`)
    //     receivedMessage.react(customEmoji)
    // })
    // If you know the ID of the custom emoji you want, you can get it directly with:
    // let customEmoji = receivedMessage.guild.emojis.get(emojiId)
})


client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
        return
    }

    if (receivedMessage.content.startsWith("!")) {
        processCommand(receivedMessage)
    }
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments

    if (primaryCommand == "help") {
        helpCommand(arguments, receivedMessage)
    } else if (primaryCommand == "multiply") {
        multiplyCommand(arguments, receivedMessage)
    } else {
        receivedMessage.channel.send("I don't understand the command. Try `!help` or `!multiply`")
    }
}

function helpCommand(arguments, receivedMessage) {
    if (arguments.length > 0) {
        receivedMessage.channel.send("It looks like you might need help with " + arguments)
    } else {
        receivedMessage.channel.send("I'm not sure what you need help with. Try `!help [topic]`")
    }
}

function multiplyCommand(arguments, receivedMessage) {
    if (arguments.length < 2) {
        receivedMessage.channel.send("Not enough values to multiply. Try `!multiply 2 4 10` or `!multiply 5.2 7`")
        return
    }
    let product = 1
    arguments.forEach((value) => {
        product = product * parseFloat(value)
    })
    receivedMessage.channel.send("The product of " + arguments + " multiplied together is: " + product.toString())
}


client.login(bot_secret_token)
