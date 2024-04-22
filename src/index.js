require('dotenv').config();
var TelegramBot = require('node-telegram-bot-api');
var PrismaClient = require('@prisma/client').PrismaClient;
var prisma = new PrismaClient();
var bot = new TelegramBot(process.env.TOKEN, { polling: true });
var sendEmail = "";
bot.on('message', function (msg) {
    var chatId = msg.chat.id;
    var dataMsg = new Date();
    if (dataMsg.getHours() >= 9 && dataMsg.getHours() <= 18) {
        bot.sendMessage(chatId, 'https://faesa.br');
    }
    else if (sendEmail == "") {
        bot.sendMessage(chatId, 'Informe seu e-mail');
        sendEmail = "X";
    }
    else {
        if (msg.text.includes('@')) {
            salvarEmail(msg.text, dataMsg);
            bot.sendMessage(chatId, 'e-mail salvo, entraremos em contato');
            sendEmail = "";
        }
        else {
            bot.sendMessage(chatId, 'Informe o e-mail válido');
        }
    }
});
function salvarEmail(email, data) {
    try {
        var user = prisma.user.create({
            data: {
                email: email,
                data: data,
            },
        });
    }
    catch (erro) {
        console.error(erro);
    }
}
