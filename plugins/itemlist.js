let fs = require('fs')
let handler  = async (m, { conn, command, args, usedPrefix, DevMode }) => {
    let items = JSON.parse(fs.readFileSync('./data/rpg/items.json')).items
    let itemname = items.name
    let itemprice = items.price
    m.reply(items)
    let itemlist = `${itemname}\n${itemprice}`
    m.reply(itemlist)
}

handler.help = ['itemlist']
handler.tags = ['rpg']
handler.owner = false
    
handler.command = /^(itemlist|hargaitem)$/i
module.exports = handler