let { MessageType } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
let handler = async (m, { conn, text }) => {

	let monsters = [
		{ area: 2, name: "Antlion Larva", drop: "Antlion Mandible", droprate: 16, url: "https://static.wikia.nocookie.net/terraria_gamepedia/images/c/c8/Antlion_Larva.png/revision/latest/scale-to-width-down/30?cb=20200517034039&format=original" },
		{ area: 5, name: "Tim", drop: "Wizard Hat", droprate: 100, url: "https://static.wikia.nocookie.net/terraria_gamepedia/images/e/ea/Tim.png/revision/latest/scale-to-width-down/34?cb=20171104013044&format=original" },
	]
	let player = global.db.data.users[m.sender]
	let pname = conn.getName(m.sender)

	let cdm = `${MeNit(new Date - player.lasthunt)}`
	let cds = `${DeTik(new Date - player.lasthunt)}`
	let cd1 = Math.ceil(01 - cdm)
	let cd2 = Math.ceil(60 - cds)


	let areaPlayer = monsters.map(v => v.area)
    areaPlayer = areaPlayer[Math.floor(Math.random() * areaPlayer.length)]
	let area_monsters = monsters.filter(monster => { return monster.area === areaPlayer })
	let monster = area_monsters[Math.floor(Math.random() * area_monsters.length)]
	let monsterName = monster.name.toUpperCase()
	let randomizer = `${Math.floor(Math.random() * 101)}`.trim()
    
	if (player.money > 0) {
		let sum = 10 * areaPlayer - 59
		let dmg = (player.sword  * 5 + player.armor * 5 - sum)
		dmg = dmg < 0 ? Math.abs(dmg) : 0
		let coins = areaPlayer * 50
		let exp = areaPlayer * 20
        let monsterdrop = monster.drop
		let monsterdroped = `dropped nothing`

		if (randomizer <= monster.droprate) {
		//mosnter drop items
		player.rpg[monsterdrop]
		if (!player.rpg[monsterdrop]) player.rpg[monsterdrop] = 0
		player.rpg[monsterdrop] += 1
		monsterdroped = `dropped ${monsterdrop}`
		} else {
			monsterdroped = `dropped nothing`
		}


		player.healt -= dmg
		player.lasthunt = new Date * 1 // waktu hunt 2menit

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

handler.help = ['thunt']
handler.tags = ['rpg']
handler.command = /^thunt/i

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
  