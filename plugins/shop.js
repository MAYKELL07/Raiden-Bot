let fs = require('fs')
let { MessageType } = require('@adiwajshing/baileys')
let handler  = async (m, { conn, command, args, usedPrefix, DevMode }) => {
    try {
    //variable
    let items = JSON.parse(fs.readFileSync('./data/rpg/items.json')).items
    let str = args[0]
    let numstr = args[1]
    //is args 1 and 2 is an word or number?
    if(isNaN(numstr)){
        numstr = " " + numstr
        str = str.concat(numstr)
        numstr = args[2]
      }
    let arr = str.split(" ");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    let str1 = arr.join(" ");
    //change name to uppercase and merge
    let item = items.find(({ name })=> name == str1)
    let player = global.db.data.users[m.sender]
    //itemlist
    let listname = items.name
    let listprice = items.price
    //call item amount,price and -percentage
    let amount = args[1] || 1
    let itemname = item?.name
    let totalprice = item?.price * (amount * 1)
    let sellprice = item?.price * (amount * 1)
    sellprice = Math.floor(percentCalculation(sellprice, 10))
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
        if (args[0]) {throw `${args[0]} tidak ada di item list`}
        throw `ketik .itemlist untuk melihat list item!`
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