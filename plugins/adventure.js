let fs = require('fs')
let { MessageType } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
let handler = async (m, { conn, text }) => {
//read data
    let monsters = JSON.parse(fs.readFileSync('./data/rpg/monster.json')).monsters
	let items = JSON.parse(fs.readFileSync('./data/rpg/items.json')).items
    let itemarray = pickRandom(['Potion','Rock','Wood'])
//player data
    let player = global.db.data.users[m.sender]
	let pname = conn.getName(m.sender)
//cooldown reader
    let cdm = `${MeNit(new Date - player.lastadventure)}`
	let cds = `${DeTik(new Date - player.lastadventure)}`
	let cd1 = Math.ceil(01 - cdm)
	let cd2 = Math.ceil(60 - cds)
//result variable
    let coins = player.level * 50
    let exp = player.level * 20
    let location = pickRandom(['indonesia','jepang','america','china','australia'])
    let result1 = `tidak menemukan apa-apa`
    let result2 = `mendapatkan ${new Intl.NumberFormat('en-US').format(coins)} coins & ${new Intl.NumberFormat('en-US').format(exp)} XP`
    let result3 = ``
    let url = `https://static.wikia.nocookie.net/terraria_gamepedia/images/7/7e/Blood_Crawler.png/revision/latest/scale-to-width-down/60?cb=20200804000419&format=original`
//randomizer
    let randomizer = `${Math.floor(Math.random() * 101)}`.trim()
//item and monster data fetch
    if (new Date -  global.db.data.users[m.sender].lastadventure > 120000) {
        if (randomizer < 50) {
//Item get data
            let item = items.filter(({ name })=> name == itemarray)[0]
            let itemname = item.name
            result3 = `you found nothing`
            let itemamount = `${Math.floor(Math.random() * 5 * player.level + 1)}`.trim()
//item data read and write
            player.rpg.items[itemname]
            if (!player.rpg.items[itemname]) player.rpg.items[itemname] = 0
            player.rpg.items[itemname] += itemamount
            result1 = `menemukan ${itemname} x${itemamount}\n`
            result3 = `menemukan ${itemname} x${itemamount}`
            url = item.url
        } else {
//Monster get data//
            let area_monsters = monsters.filter(({ area })=> area <= 3)
            let monster = area_monsters[Math.floor(Math.random() * area_monsters.length)]
            let monstername = monster.name.toUpperCase()
//data read and write
            let sum = monster.area
            let dmg = (player.sword  * 5 + player.armor * 5 - sum)
            dmg = dmg < 0 ? Math.abs(dmg) : 0
            player.healt -= dmg
            let monsterdrop = monster.drop
            result3 = monstername
            url = monster.url
            if (player.healt < 0) {
                if (randomizer <= monster.droprate)
                    player.rpg.items[monsterdrop]
                    if (!player.rpg.items[monsterdrop]) player.rpg.items[monsterdrop] = 0
                    player.rpg.items[monsterdrop] += 1
                    result1 = `menemukan dan membunuh *${monstername}* -${dmg}Hp`
                    result2 = `mendapatkan ${monsterdrop}\n${new Intl.NumberFormat('en-US').format(coins)} coins & ${new Intl.NumberFormat('en-US').format(exp)} XP`
            } else {
                player.healt = 0
                result1 = `menemukan *${monstername}* tapi gagal membunuhnya`
            }
        }
        player.money += coins * player.level
		player.exp += exp * player.level
        player.lastadventure = new Date * 1
        let pesan = `*${pname}* menjelajah sampai *${location}* dan ${result1} *${result2}*`
        conn.sendMessage(m.chat, pesan, MessageType.text, { //send massage
			contextInfo: {
			externalAdReply: {
			title: result3,
			body: result1,
			thumbnail: await (await fetch(url)).buffer() ,
			sourceUrl: 'http://raiden-bot.ga/'}}})
    } else throw `Tunggu *${cd1}:${cd2}* Untuk Adventure Lagi`
}

handler.help = ['adventure']
handler.tags = ['rpg']
handler.command = /^adventure/i

handler.owner = false
handler.disabled = false

handler.fail = null

module.exports = handler

function MeNit(ms) {
	let m = isNaN(ms) ? '02' : Math.floor(ms / 60000) % 60
	return [m].map(v => v.toString().padStart(2, 0)).join(':')
}

function DeTik(ms) {
	let s = isNaN(ms) ? '60' : Math.floor(ms / 1000) % 60
	return [s].map(v => v.toString().padStart(2, 0)).join(':')
}

function pickRandom(list) {
	return list[Math.floor(Math.random() * list.length)]
  }
