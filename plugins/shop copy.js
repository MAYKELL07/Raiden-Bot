let { MessageType } = require('@adiwajshing/baileys')
let handler  = async (m, { conn, command, args, usedPrefix, DevMode }) => {
    const _armor = global.db.data.users[m.sender].armor
    const armor = (_armor == 0 ? 20000 : '' || _armor == 1 ? 49999 : '' || _armor == 2 ? 99999 : '' || _armor == 3 ? 149999 : '' || _armor == 4 ? 299999 : '')
    let items = JSON.parse(fs.readFileSync('./data/rpg/items.json')).items
    let item = items.filter(({ name })=> name == args[1])
    let player = global.db.data.users[m.sender]
    let amount = args[2]
    let itemname = item.name
    if (args[0] == "buy") {
        if (args[1] == item ) {
            if (item.price = 0) {
                m.reply(`kamu tidak bisa membeli *${itemname}*`)
            } else if (player.money >= item.price) { 
            player.rpg.items[itemname]
            if (!player.rpg.items[itemname]) player.rpg.items[itemname] = 0
            player.money -= (item.price * amount)
            player.rpg.items[itemname] += amount 
            }
        } else throw 'mau beli apa mas?'
    }
    } catch (e) {
        conn.reply(m.chat, Kchat, m)
        console.log(e)
        if (DevMode) {
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.sendMessage(jid, 'shop.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
            }
        }
    }
}

handler.help = ['buy <args>', 'sell <args>']
handler.tags = ['rpg']
    
handler.command = /^(buy|beli|sell|jual)$/i
module.exports = handler