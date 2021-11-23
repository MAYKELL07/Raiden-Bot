let levelling = require('../lib/levelling')
let handler = async (m, { conn, usedPrefix }) => {
    let name = m.fromMe ? conn.user : conn.contacts[m.sender]
    let money = global.db.data.users[m.sender].money
    let bank = global.db.data.users[m.sender].bank
    let banklimit = global.db.data.users[m.sender].banklimit
    let str = `
balance *${name.vnmae || name.notify || name.name || ('+' + name.jid.split`@`[0])}*\n
Money: *${money}*
Bank : *${bank} / ${banklimit}*
`.trim()
    conn.reply(m.chat, str, m)
}
handler.help = ['bal', `balance`]
handler.tags = ['economy']
handler.command = /^(bal(ance)?|bal|money)$/i
module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)