const fs = require('fs');
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const grp = require('./config.json');

const client = new Client();

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
    client.getChats().then(chats => {
        const myGroup = chats.find((chat) => chat.name === grp.GroupName);
        client.sendMessage(
            myGroup.id._serialized,
            "Hello !! I Am Ready !!"
        );
    });
});

client.initialize();
