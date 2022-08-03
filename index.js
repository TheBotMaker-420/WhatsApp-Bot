const fs = require('fs');
const { Client , LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const grp = require('./config.json');

const client = new Client({
    authStrategy: new LocalAuth()
});

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

client.on('message', async (message) => {
    const command = message.body.toLowerCase();

	if(command === 'hello') {
		const chat = await message.getChat();
    const contact = await message.getContact();
    
    await chat.sendMessage(`Hello @${contact.id.user} !!`, {
        mentions: [contact]
    });

	}
});

client.initialize();
