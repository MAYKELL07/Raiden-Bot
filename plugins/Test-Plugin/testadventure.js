//get item and monster but 50/50 chance
let fs = require('fs')
let { MessageType } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
let handler = async (m, { conn, text }) => {

	let monsters = JSON.parse(fs.readFileSync('./data/rpg/monster.json')).monsters
	let items = JSON.parse(fs.readFileSync('./data/rpg/items.json')).items
	let player = global.db.data.users[m.sender]
	let pname = conn.getName(m.sender)

	let cdm = `${MeNit(new Date - player.lastadventure)}`
	let cds = `${DeTik(new Date - player.lastadventure)}`
	let cd1 = Math.ceil(01 - cdm)
	let cd2 = Math.ceil(60 - cds)

	let location = pickRandom(['indo','jepang'])
	let pesan = `p`

    //monster
	let areaPlayer = monsters.map(v => v.area)
    areaPlayer = areaPlayer[Math.floor(Math.random() * areaPlayer.length)]
	let area_monsters = monsters.filter(monster => { return monster.area === areaPlayer })
	let monster = area_monsters[Math.floor(Math.random() * area_monsters.length)]
	let monsterName = monster.name.toUpperCase()
	//items
   let rarityItems = items.filter(({ rarity })=> rarity == 'uncommon')
   let Item = rarityItems[Math.floor(Math.random() * rarityItems.length)]
   let itemName = Item.Name.toUpperCase()

	let randomizer = `${Math.floor(Math.random() * 101)}`.trim()
	let randomizer2 = `${Math.floor(Math.random() * 101)}`.trim()
	let url = monster.url
    
	if (new Date -  global.db.data.users[m.sender].lastadventure > 120000) {
		let sum = 0
		let dmg = (player.sword  * 5 + player.armor * 5 - sum)
		dmg = dmg < 0 ? Math.abs(dmg) : 0
		let coins = areaPlayer * 50
		let exp = areaPlayer * 20
        let monsterdrop = monster.drop
		let monsterdroped = `dropped nothing`
		let itemdroped = `you got nothing`
		if (randomizer < 50) {
			if (randomizer2 <= Item.chance) {
				//items drop
				player.rpg.items[itemName]
				if (!player.rpg.items[itemName]) player.rpg.items[itemName] = 0
				player.rpg.items[itemName] += 1
				itemdroped = `you got ${itemName}`
				url = Item.url
				pesan = `*${pname}* menjelajah sampai ${location} dan Menemukan ${itemName}\n${new Intl.NumberFormat('en-US').format(coins)} coins & ${new Intl.NumberFormat('en-US').format(exp)} XP`
				} else {
					pesan = `*${pname}* menjelajah sampai ${location} dan tidak menemukan apa apa\n${new Intl.NumberFormat('en-US').format(coins)} coins & ${new Intl.NumberFormat('en-US').format(exp)} XP`
					itemdroped = `you got nothing`
				}
		} else 	if (randomizer <= monster.droprate) {
			//mosnter drop items
			let sum = 10 * areaPlayer - 59
			player.rpg.items[monsterdrop]
			if (!player.rpg.items[monsterdrop]) player.rpg.items[monsterdrop] = 0
			player.rpg.items[monsterdrop] += 1
			monsterdroped = `dropped ${monsterdrop}`
			url = monster.url
			pesan = `*${pname}* Menemukan Dan Membunuh *${monsterName}*\nMendapatkan ${new Intl.NumberFormat('en-US').format(coins)} coins & ${new Intl.NumberFormat('en-US').format(exp)} XP\nBerkurang -${dmg}Hp, Tersisa ${player.healt}/${100}`
			} else {
				pesan = `*${pname}* tidak menemukan apa apa`
				monsterdroped = `dropped nothing`
			}

		player.healt -= dmg
		player.lastadventure = new Date * 1 // waktu hunt 2menit

		if (player.healt < 0) {
			let msg = `*${pname}* Anda Mati Di Bunuh Oleh *${monsterName}*`
			if (player.level > 0) {
				player.level -= 1
				msg += `\nLevel Anda Turun 1 Karena Mati Saat Adventure!`
			}
			player.healt = 100
			m.reply(msg)
			return
		}

		player.money += coins * 1
		player.exp += exp * 1
		
		
		conn.sendMessage(m.chat, pesan, MessageType.text, {
			contextInfo: {
			externalAdReply: {
			title: `${monsterName}${itemName}\noiah9dh9aowhjd9ah9njwd9wah9w`,
			body: monsterdroped,
			thumbnail: await (await fetch(url)).buffer() ,
			sourceUrl: 'http://raiden-bot.ga/'}}})
	} else throw `Tunggu *${cd1}:${cd2}* Untuk Adventure Lagi`
}

handler.help = ['tadv']
handler.tags = ['rpg']
handler.command = /^tadv/i

handler.owner = true
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
  