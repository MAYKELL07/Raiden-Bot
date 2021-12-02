let fs = require('fs')
let { MessageType } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
let handler = async (m, { conn, text }) => {

	let monsters = [
		{ area: 1, name: "Angry Bones", url: "https://static.wikia.nocookie.net/terraria_gamepedia/images/f/f6/Angry_Bones_1.png/revision/latest/scale-to-width-down/30?cb=20200530060826&format=original" },
		{ area: 1, name: "Anomura Fungus", url: "https://static.wikia.nocookie.net/terraria_gamepedia/images/f/f0/Anomura_Fungus.png/revision/latest/scale-to-width-down/50?cb=20200521181927&format=original" },
		{ area: 1, name: "Antlion", url: "https://static.wikia.nocookie.net/terraria_gamepedia/images/f/ff/Antlion.png/revision/latest/scale-to-width-down/36?cb=20191128180152&format=original" },
		{ area: 2, name: "Antlion Charger", url: "https://static.wikia.nocookie.net/terraria_gamepedia/images/6/6c/Antlion_Charger.png/revision/latest/scale-to-width-down/62?cb=20200517034253&format=original" },
		{ area: 2, name: "Antlion Larva", url: "https://static.wikia.nocookie.net/terraria_gamepedia/images/c/c8/Antlion_Larva.png/revision/latest/scale-to-width-down/30?cb=20200517034039&format=original" },
		{ area: 2, name: "Baby Slime", url: "https://static.wikia.nocookie.net/terraria_gamepedia/images/6/6d/Baby_Slime.png/revision/latest/scale-to-width-down/32?cb=20170121233645&format=original" },
		{ area: 3, name: "Black Slime", url: "https://static.wikia.nocookie.net/terraria_gamepedia/images/5/5c/Black_Slime.png/revision/latest/scale-to-width-down/32?cb=20110828163020&format=original" },
		{ area: 3, name: "Cochineal Beetle", url: "https://static.wikia.nocookie.net/terraria_gamepedia/images/9/9b/Cochineal_Beetle.png/revision/latest/scale-to-width-down/32?cb=20200523235211&format=original" },
		{ area: 3, name: "Blood Crawler", url: "https://static.wikia.nocookie.net/terraria_gamepedia/images/7/7e/Blood_Crawler.png/revision/latest/scale-to-width-down/60?cb=20200804000419&format=original" },
		{ area: 4, name: "Ghost", url: "https://static.wikia.nocookie.net/terraria_gamepedia/images/7/70/Ghost_%28enemy%29.png/revision/latest/scale-to-width-down/32?cb=20131025175525&format=original" },
		{ area: 4, name: "Green Slime", url: "https://static.wikia.nocookie.net/terraria_gamepedia/images/7/7b/Green_Slime.png/revision/latest/scale-to-width-down/32?cb=20141106201737&format=original" },
		{ area: 4, name: "Frozen Zombie", url: "https://static.wikia.nocookie.net/terraria_gamepedia/images/c/cf/Frozen_Zombie.png/revision/latest/scale-to-width-down/34?cb=20170422010132&format=original" },
		{ area: 5, name: "Zombie", url: "https://static.wikia.nocookie.net/terraria_gamepedia/images/c/c3/Zombie.png/revision/latest/scale-to-width-down/34?cb=20171102011214&format=original" },
		{ area: 5, name: "Undead Viking", url: "https://static.wikia.nocookie.net/terraria_gamepedia/images/8/83/Undead_Viking.png/revision/latest/scale-to-width-down/30?cb=20170421015630&format=original" },
		{ area: 5, name: "Tim", url: "https://static.wikia.nocookie.net/terraria_gamepedia/images/e/ea/Tim.png/revision/latest/scale-to-width-down/34?cb=20171104013044&format=original" },
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
    

	if (new Date -  global.db.data.users[m.sender].lasthunt > 120000) {
		let sum = 10 * areaPlayer - 59
		let dmg = (player.sword  * 5 + player.armor * 5 - sum)
		dmg = dmg < 0 ? Math.abs(dmg) : 0
		let coins = areaPlayer * 50
		let exp = areaPlayer * 20

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
			body: `*-${dmg}*`,
			thumbnail: await (await fetch(url)).buffer() ,
			sourceUrl: 'http://raiden-bot.ga/'}}})
	} else throw `Tunggu *${cd1}:${cd2}* Untuk Berburu Lagi`
}

handler.help = ['hunt']
handler.tags = ['rpg']
handler.command = /^hunt/i

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
  