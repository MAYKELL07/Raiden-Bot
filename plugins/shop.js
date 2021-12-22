let fs = require('fs')
let { MessageType } = require('@adiwajshing/baileys')
let handler  = async (m, { conn, command, args, usedPrefix, DevMode }) => {
    try {
    const _armor = global.db.data.users[m.sender].armor
    const armor = (_armor == 0 ? 20000 : '' || _armor == 1 ? 49999 : '' || _armor == 2 ? 99999 : '' || _armor == 3 ? 149999 : '' || _armor == 4 ? 299999 : '')
    let items = JSON.parse(fs.readFileSync('./data/rpg/items.json')).items
    let item = items.find(({ name })=> name == args[0])
    let player = global.db.data.users[m.sender]
    let amount = args[1]
    let itemname = item?.name
    let totalprice = item.price * (amount * 1)
    let sellprice = item.price * (amount * 1)
    sellprice = Math.floor(percentCalculation(sellprice, 25))
    if (/itemlist|hargaitem/i.test(command)) {
        m.reply(items)
    }
    if (/buy|beli/i.test(command)) {
        if (item) {
            if (item.price = 0) {
                m.reply(`kamu tidak bisa membeli ${itemname}`)
            } else if (player.money >= totalprice) {
            player.rpg.items[itemname]
            if (!player.rpg.items[itemname]) player.rpg.items[itemname] = 0
            player.money -= totalprice
            player.rpg.items[itemname] += amount * 1
            m.reply(`berhasil membeli ${itemname}`)
            } else {m.reply(`uang mu tidak cukup untuk membeli ${itemname}`)}
        } else throw `mau beli apa mas?`
    }
    if (/sell|jual/i.test(command)) {
        if (item) {
            if (item.price = 0) {
                m.reply(`kamu tidak bisa memjual ${itemname}`)
            } else if (player.rpg.items[itemname] >= amount) { 
            player.money += sellprice
            player.rpg.items[itemname] -= amount * 1
            m.reply(`berhasil memjual ${itemname}`)
            } else {m.reply(`kamu tidak punya *${itemname}* untuk di jual`)}
        } else throw `mau jual apa mas?`
    }
    } catch (e) {
        throw `ketik .itemlist untuk melihat harga item!`
    }
}

handler.help = ['buy <args>', 'sell <args>']
handler.tags = ['rpg']
handler.owner = true
    
handler.command = /^(buy|beli|sell|jual)$/i
module.exports = handler

function percentCalculation(a, b){
    var c = (parseFloat(a)*parseFloat(b))/100;
    return parseFloat(c);
  }