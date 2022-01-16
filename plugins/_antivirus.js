let handler = m => m

handler.all = async function (m, { isBotAdmin }) {
    //AntiVirus
    if (m.messageStubType === 68) {
        let log = {
            key: m.key,
            content: m.msg,
            sender: m.sender
        }
        await this.modifyChat(m.chat, 'clear', {
            includeStarred: false
        }).catch(console.log)
    }
    //AntiTroli
    if (m.message && m.isBaileys && m.quoted && m.quoted.mtype === 'orderMessage' && !(m.quoted.token && m.quoted.orderId)) {
        m.reply('Troli Terdeteksi\n\n' + require('util').format(m.key), null)
        await this.modifyChat(m.chat, 'clear', {
            includeStarred: false
        }).catch(console.log)
    }
    //AntiVirtex
    if (m.message && (m.text.match(/(৭৭৭৭৭৭৭৭|๒๒๒๒๒๒๒๒|๑๑๑๑๑๑๑๑|ดุท้่เึางืผิดุท้่เึางื|𐎑⃢𝘼𝙩𝙩𝙖𝙘𝙠|۩꦳|ผิดุท้เึางื)/gi))) {
        if (m.fromMe) return
        m.reply('Virtex Terdekteksi')
        await this.modifyChat(m.chat, 'clear', {
            includeStarred: false
        }).catch(console.log)
        if (global.opts['restrict']) {
            if (isBotAdmin) this.groupRemove(m.chat, [m.sender])
          }
        this.reply(global.owner[0] + '@s.whatsapp.net', `
*Virtex Terdeteksi* @${m.sender.split`@`[0]}
ID: ${m.isGroup ? m.chat : m.sender}
Nama: ${m.isGroup ? this.getName(m.chat) : this.getName(m.sender)}
`.trim(), null, { contextInfo: { mentionedJid: [m.sender] } })
    }
    //Anti-BugGc
    switch (m.mtype) {
        case 'protocolMessage':
          switch (m.msg.type) {
            case 3:
              if (m.isGroup) {
                let log = {
                  key: m.key,
                  content: m.msg,
                  sender: m.sender
                }
                this.sendMessage(m.chat, ('*BUG GRUP TERDETEKSI, JANGAN SCROLL KEATAS! HAPUS CHAT INI BIAR GA EROR!!!*\n\n' + require('util').format(log)).padEnd(65536, '\n'), 'extendedTextMessage')
                // this.modifyChat(m.chat, 'clear', {
                //     includeStarred: false
                // }).catch(console.error)
                this.reply(global.owner[0] + '@s.whatsapp.net', `
  Pelaku pengirim bug gc @${m.sender.split`@`[0]}
  ID: ${m.isGroup ? m.chat : m.sender}
  Nama: ${m.isGroup ? this.getName(m.chat) : this.getName(m.sender)}
  `.trim(), null, { contextInfo: { mentionedJid: [m.sender] } })
              }
              break
          }
          break
      }
}

module.exports = handler