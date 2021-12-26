let fs = require('fs')
let { MessageType } = require('@adiwajshing/baileys')
let handler  = async (m, { conn, command, args, usedPrefix, DevMode }) => {
    let items = JSON.parse(fs.readFileSync('./data/rpg/items.json')).items
    let str = args[0]
    let arr = str.split(" ");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    
    }
    let str1 = arr.join(" ");
    console.log(str1)
    let item = items.find(({ name })=> name == str1)
    let player = global.db.data.users[m.sender]
    let amount = args[1] || 1
    let itemname = item?.name
    let totalprice = item?.price * (amount * 1)
    let sellprice = item?.price * (amount * 1)
    sellprice = Math.floor(percentCalculation(sellprice, 10))
    if (/itemlist|hargaitem/i.test(command)) {
        m.reply(`*list item masih tahap beta*\n\nharga jual di kurangi 25%`)
    }
    try {
    if (/buy|beli/i.test(command)) {
        if (item) {
            if (!item.price) {
                m.reply(`kamu tidak bisa membeli ${itemname}`)
            } else if (player.money * 1 >= totalprice) {
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

handler.help = ['buy <args>', 'sell <args>', 'itemlist']
handler.tags = ['rpg']
handler.owner = false
    
handler.command = /^(buy|beli|sell|jual|itemlist|hargaitem)$/i
module.exports = handler

function percentCalculation(a, b){
    var c = (parseFloat(a)*parseFloat(b))/100;
    return parseFloat(c);
  }