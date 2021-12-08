let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn, command, args, text, usedPrefix, DevMode }) => {
    let massage = `${usedPrefix}open <crate name>`
    let type = (args[0] || '').toLowerCase()
    let amount = (args[1] || '').toLowerCase()
    let common = ["potion"];
    let uncommon = ["egg"];
    let rare = ["fish"];
    let epic = ["banknote"];
    let legendary = ["moracrystal"];
    let randomnumCommon = `${Math.floor(Math.random() * 11 + 1 * amount)}`.trim()
    let randomnumUnommon = `${Math.floor(Math.random() * 8 * amount)}`.trim() 
    let randomnumRare = `${Math.floor(Math.random() * 5 * amount)}`.trim()
    let randomnumEpic = `${Math.floor(Math.random() * 5 - 2 * amount)}`.trim()
    let randomnumLegendary = `${Math.floor(Math.random() * 11 - 9 * amount)}`.trim()
    let randCommon = common[Math.floor(Math.random() * common.length)];
    let randUncommon = colors[Math.floor(Math.random() * colors.length)];
    let randRare = colors[Math.floor(Math.random() * colors.length)];
    let randEpic = colors[Math.floor(Math.random() * colors.length)];
    let randLegendary = colors[Math.floor(Math.random() * colors.length)];
    let user = global.db.data.users[m.sender]
    if (randomnumLegendary < 0) randomnumLegendary = 0; 
    if (randomnumEpic < 0) randomnumEpic = 0;  
    try {
        switch (type) {
            case 'common':
                if (user.common >= amount) {
                    user.common -= amount
                    user.money += `${Math.floor(Math.random() * 10 * amount)}`.trim()
                    user.exp += `${Math.floor(Math.random() * 10 * amount)}`.trim()
                    if (!user.rpg[randCommon]) { //random common item
                        user.rpg[randCommon] = 0
                        user.rpg[randCommon] += randomnumCommon}
                    if (!user.rpg[randUncommon]) { //random uncommon item
                        user.rpg[randUncommon] = 0
                        user.rpg[randUncommon] += randomnumUnommon}
                }
            break      
        }
    } catch (e) {
        console.log(e)
        conn.reply(m.chat, `${usedPrefix}open <crate name> < 1 | 10 | 100 | 1000 >\n\nContoh penggunaan: *${usedPrefix}open common 10*\n\nlist crate:\n*common*\n*uncommon*\n*mythic*\n*legendary*`, m)
        if (DevMode) {
          for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
              conn.sendMessage(jid, 'Open.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
          }
      }
    }
}