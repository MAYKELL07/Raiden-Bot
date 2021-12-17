let fs = require('fs')
let { MessageType } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
let handler = async (m, { conn, text }) => {
	

	let monsters = JSON.parse(fs.readFileSync('./data/rpg/monster.json')).monsters
	let player = global.db.data.users[m.sender]
	let pname = conn.getName(m.sender)

	let cdm = `${MeNit(new Date - player.rpg.lasthunt)}`
	let cds = `${DeTik(new Date - player.rpg.lasthunt)}`
	let cd1 = Math.ceil(01 - cdm)
	let cd2 = Math.ceil(60 - cds)


	let areaPlayer = monsters.map(v => v.area)
    areaPlayer = areaPlayer[Math.floor(Math.random() * areaPlayer.length)]
	let area_monsters = monsters.filter(monster => { return monster.area === areaPlayer })
	let monster = area_monsters[Math.floor(Math.random() * area_monsters.length)]
	let monsterName = monster.name.toUpperCase()
	let randomizer = `${Math.floor(Math.random() * 101)}`.trim()
    
	if (new Date -  global.db.data.users[m.sender].rpg.lasthunt > 120000) {
		let sum = 10 * areaPlayer - 59
		let dmg = (player.sword  * 5 + player.armor * 5 - sum)
		dmg = dmg < 0 ? Math.abs(dmg) : 0
		let coins = areaPlayer * 50
		let exp = areaPlayer * 20
        let monsterdrop = monster.drop
		let monsterdroped = `dropped nothing`

		if (randomizer <= monster.droprate) {
		//mosnter drop items
		player.rpg.items[monsterdrop]
		if (!player.rpg.items[monsterdrop]) player.rpg.items[monsterdrop] = 0
		player.rpg.items[monsterdrop] += 1
		monsterdroped = `dropped ${monsterdrop}`
		} else {
			monsterdroped = `dropped nothing`
		}


		player.healt -= dmg
		player.rpg.lasthunt = new Date * 1 // waktu hunt 2menit

		if (player.healt < 0) {
			let msg = `*${pname}* Anda Mati Di Bunuh Oleh *${monsterName}*`
			if (player.level > 0) {
				player.level -= 1
				msg += `\nLevel Anda Turun 1 Karena Mati Saat Berburu!`
			}
			player.healt = 100
			m.reply(msg)
			return
		}

		player.money += coins * 1
		player.exp += exp * 1
		let url = monster.url
		let pesan = `*${pname}* Menemukan Dan Membunuh *${monsterName}*\nMendapatkan ${new Intl.NumberFormat('en-US').format(coins)} coins & ${new Intl.NumberFormat('en-US').format(exp)} XP\nBerkurang -${dmg}Hp, Tersisa ${player.healt}/${100}`
		conn.sendMessage(m.chat, pesan, MessageType.text, {
			contextInfo: {
			externalAdReply: {
			title: monsterName,
			body: monsterdroped,
			thumbnail: await (await fetch(url)).buffer() ,
			sourceUrl: 'http://raiden-bot.ga/'}}})
	} else throw `Tunggu *${cd1}:${cd2}* Untuk Berburu Lagi`
}

handler.help = ['hunt']
handler.tags = ['rpg']
handler.command = /^hunt/i

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
  