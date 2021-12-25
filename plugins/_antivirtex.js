let handler = m => m

handler.all = async function (m, isBotAdmin) {
    if (m.message && (m.text.match(/(৭৭৭৭৭৭৭৭|๒๒๒๒๒๒๒๒|๑๑๑๑๑๑๑๑|ดุท้่เึางืผิดุท้่เึางื|𐎑⃢𝘼𝙩𝙩𝙖𝙘𝙠|۩꦳|ผิดุท้เึางื)/gi) || m.text.length >= 5000)) {
        m.reply('Virtex Terdekteksi')
        await this.modifyChat(m.chat, 'clear', {
            includeStarred: false
        }).catch(console.log)
        if (isBotAdmin) this.groupRemove(m.chat, [m.sender])
        this.reply(global.owner[0] + '@s.whatsapp.net', `
*Virtex Terdeteksi oleh* @${m.sender.split`@`[0]}
ID: ${m.isGroup ? m.chat : m.sender}
Nama: ${m.isGroup ? this.getName(m.chat) : this.getName(m.sender)}
`.trim(), null, { contextInfo: { mentionedJid: [m.sender] } })
    }
}

module.exports = handler