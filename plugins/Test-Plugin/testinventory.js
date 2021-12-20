let handler = async (m, { conn, usedPrefix }) => {
    let inventoryy = global.db.data.users[m.sender].rpg
    let name = m.fromMe ? conn.user : conn.contacts[m.sender]
    let word = JSON.stringify(inventoryy).replaceAll (',','\n')
    let words = word.replaceAll(/["{}]/g,'')
    let finalstring = words.replaceAll(':',' x')

    let str = `
Inventory *${name.vnmae || name.notify || name.name || ('+' + name.jid.split`@`[0])}*\n
${finalstring}
    `.trim()
    conn.reply(m.chat, str, m)
}
handler.help = ['tinventory', 'tinv', `tbackpack`]
handler.tags = ['rpg']
handler.command = /^(tinv(entory)?|tlevel(ing)?|te?xp|tbackpack)$/i
handler.owner = true
module.exports = handler