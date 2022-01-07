let levelling = require('../lib/levelling')
let handler = async (m, { conn, usedPrefix }) => {
    let inventoryy = global.db.data.users[m.sender].rpg
    let healt = global.db.data.users[m.sender].healt
    let armor = global.db.data.users[m.sender].armor 
    let warn = global.db.data.users[m.sender].warn
    let banklimit = global.db.data.users[m.sender].banklimit
    let level = global.db.data.users[m.sender].level
    let money = global.db.data.users[m.sender].money
    let bank = global.db.data.users[m.sender].bank
    let exp = global.db.data.users[m.sender].exp
    let { max } = levelling.xpRange(level, exp, global.multiplier)
    let name = m.fromMe ? conn.user : conn.contacts[m.sender]
    let word = JSON.stringify(inventoryy).replaceAll (',','\n')
    let words = word.replaceAll(/["{}]/g,'')
    let wordss = words.replaceAll(':',' x')
    let wordsss = wordss.replace("fish x","*FISH*\n")
    let finalstring = wordsss.replace("items x","*ITEMS*\n")
    let str = `
Inventory *${name.vnmae || name.notify || name.name || ('+' + name.jid.split`@`[0])}*\n
Health: *${healt}*
Armor: *${armor == 0 ? 'Tidak Punya' : '' || armor == 1 ? 'Leather Armor' : '' || armor == 2 ? 'Iron Armor' : '' || armor == 3 ? 'Gold Armor' : '' || armor == 4 ? 'Diamond Armor' : '' || armor == 5 ? 'Netherite Armor' : ''}*\n
Money: *${money}*
Bank : *${bank} / ${banklimit}*
Level: *${level}*
Exp: *${exp}*\n
Warn: *${warn}*
Banned: *No*
\n${readMore}\n
${finalstring}\n
`.trim()
    conn.reply(m.chat, str, m)
}
handler.help = ['inventory', 'inv', `backpack`]
handler.tags = ['rpg']
handler.command = /^(inv(entory)?|level(ing)?|e?xp|backpack)$/i
module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)