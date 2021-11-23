let { MessageType } = require('@adiwajshing/baileys')

let handler  = async (m, { conn, command, args, usedPrefix, DevMode }) => {
    let item = (args[0] || '').toLowerCase()
    const Kchat = `
${usedPrefix}shop <Buy|sell> <item> <jumlah>\n
Contoh penggunaan: *${usedPrefix}shop buy potion 1*\n\n
List Crafting Recipe:\n\n
Fishingrod: 10 Kayu

`.trim()
    try {
        if (/craft/i.test(command)) {
            const count = args[2] && args[2].length > 0 ? Math.min(99999999, Math.max(parseInt(args[2]), 1)) : !args[2] || args.length < 4 ? 1 :Math.min(1, count)
            switch (item) {
              case 'fishingrod':
                  if (global.db.data.users[m.sender].kayu >= 10) {
                      global.db.data.users[m.sender].kayu -= 10
                      global.db.data.users[m.sender].fishingrod += 1
                      conn.reply(m.chat, `Succes Craft ${count} Fishingrod`, m)
                  } else conn.reply(m.chat, `kayu anda tidak cukup untuk craft ${count} Fishingrod`,)
              break
            default:
                return conn.reply(m.chat, Kchat, m)
            }
        }
    } catch (e) {
        conn.reply(m.chat, Kchat, m)
        console.log(e)
        if (DevMode) {
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.sendMessage(jid, 'craft.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
            }
        }
    }
}

handler.help = ['craft <item> <args>']
handler.tags = ['rpg']
handler.owner = true
    
handler.command = /^(craft)$/i
module.exports = handler