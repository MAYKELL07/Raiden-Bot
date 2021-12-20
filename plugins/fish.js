let fs = require('fs')
let { MessageType } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
let handler = async (m, { conn, text }) => {

	let fishes = JSON.parse(fs.readFileSync('./data/rpg/fish.json')).fishes
	let player = global.db.data.users[m.sender]
	let pname = conn.getName(m.sender)

	let cdm = `${MeNit(new Date - player.lastfishing)}`
	let cds = `${DeTik(new Date - player.lastfishing)}`
	let cd1 = Math.ceil(01 - cdm)
	let cd2 = Math.ceil(60 - cds)

	let areaPlayer = fishes.map(v => v.area)
    areaPlayer = areaPlayer[Math.floor(Math.random() * areaPlayer.length)]
	let area_fish = fishes.filter(fishtype => { return fishtype.area === areaPlayer })
	let fishtype = area_fish[Math.floor(Math.random() * area_fish.length)]
	let fishName = fishtype.name.toUpperCase()

	if (new Date -  global.db.data.users[m.sender].lastfishing > 120000) {
		if (player.fishingrod > 0) {
		let durability = areaPlayer * 2
		let coins = areaPlayer * 50
		let exp = areaPlayer * 20
		let fishdrop = fishName
		let fishdroped = `you got nothing`

		//fish
		player.rpg.fish[fishdrop]
		if (!player.rpg.fish[fishdrop]) player.rpg.fish[fishdrop] = 0
		player.rpg.fish[fishdrop] += 1
		fishdroped = `you got ${fishdrop}`

		player.fishingroddurability -= durability
		player.lastfishing = new Date * 1 // waktu fish 4menit
		if (player.fishingroddurability < 0) {
            player.fishingrod -= 1
			let msg = `*${pname}* Fishingrod anda hancur`
			player.fishingroddurability = 0
			m.reply(msg)
			return
		}

		player.money += coins * 1
		player.exp += exp * 1
		let url = fishtype.url
		let pesan = `*${pname}* Menangkap *${fishName}*\nMendapatkan ${new Intl.NumberFormat('en-US').format(coins)} coins & ${new Intl.NumberFormat('en-US').format(exp)} XP\nBerkurang -${durability}Durability, Tersisa ${player.fishingroddurability}/${100}`
		conn.sendMessage(m.chat, pesan, MessageType.text, {
			contextInfo: {
			externalAdReply: {
			title: fishName,
			body: fishdroped,
			thumbnail: await (await fetch(url)).buffer() ,
			sourceUrl: 'http://raiden-bot.ga/'}}})
	    } else throw `anda membutuh kan fishing rod untuk memancing\nbeli fishingrod di shop`
	} else throw `Tunggu *${cd1}:${cd2}* Untuk Memancing Lagi`
}

handler.help = ['fish']
handler.tags = ['rpg']
handler.command = /^fish/i


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