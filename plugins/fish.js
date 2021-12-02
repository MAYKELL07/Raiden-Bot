let fs = require('fs')
let { MessageType } = require('@adiwajshing/baileys')
let fetch = require('node-fetch')
let handler = async (m, { conn, text }) => {

	let fishes = [
		{ area: 1, name: "Pufferfish", url: "https://stardewvalleywiki.com/mediawiki/images/b/ba/Pufferfish.png"},
		{ area: 1, name: "Anchovy", url: "https://stardewvalleywiki.com/mediawiki/images/7/79/Anchovy.png"},
		{ area: 1, name: "Tuna", url: "https://stardewvalleywiki.com/mediawiki/images/c/c5/Tuna.png"},
		{ area: 2, name: "Sardine", url: "https://stardewvalleywiki.com/mediawiki/images/0/04/Sardine.png"},
		{ area: 2, name: "Bream", url: "https://stardewvalleywiki.com/mediawiki/images/8/82/Bream.png"},
		{ area: 2, name: "Largemouth Bass", url: "https://stardewvalleywiki.com/mediawiki/images/1/11/Largemouth_Bass.png"},
		{ area: 3, name: "Smallmouth Bass", url: "https://stardewvalleywiki.com/mediawiki/images/a/a5/Smallmouth_Bass.png"},
		{ area: 3, name: "Rainbow Trout", url: "https://stardewvalleywiki.com/mediawiki/images/1/14/Rainbow_Trout.png"},
		{ area: 3, name: "Salmon", url: "https://stardewvalleywiki.com/mediawiki/images/e/e0/Salmon.png"},
		{ area: 4, name: "Walleye", url: "https://stardewvalleywiki.com/mediawiki/images/0/05/Walleye.png"},
		{ area: 4, name: "Perch", url: "https://stardewvalleywiki.com/mediawiki/images/4/43/Perch.png"},
		{ area: 4, name: "Carp", url: "https://stardewvalleywiki.com/mediawiki/images/a/a8/Carp.png"},
		{ area: 5, name: "Catfish", url: "https://stardewvalleywiki.com/mediawiki/images/9/99/Catfish.png"},
		{ area: 5, name: "Pike", url: "https://stardewvalleywiki.com/mediawiki/images/3/31/Pike.png"},
		{ area: 5, name: "Sunfish", url: "https://stardewvalleywiki.com/mediawiki/images/5/56/Sunfish.png"},
		{ area: 6, name: "Red Mullet", url: "https://stardewvalleywiki.com/mediawiki/images/f/f2/Red_Mullet.png"},
		{ area: 6, name: "Herring", url: "https://stardewvalleywiki.com/mediawiki/images/f/f1/Herring.png"},
		{ area: 6, name: "Eel", url: "https://stardewvalleywiki.com/mediawiki/images/9/91/Eel.png"},
		{ area: 7, name: "Octopus", url: "https://stardewvalleywiki.com/mediawiki/images/5/5a/Octopus.png"},
		{ area: 7, name: "Red Snapper", url: "https://stardewvalleywiki.com/mediawiki/images/d/d3/Red_Snapper.png"},
		{ area: 7, name: "Squid", url: "https://stardewvalleywiki.com/mediawiki/images/8/81/Squid.png"},
		{ area: 8, name: "Sea Cucumber", url: "https://stardewvalleywiki.com/mediawiki/images/a/a9/Sea_Cucumber.png"},
		{ area: 8, name: "Super Cucumber", url: "https://stardewvalleywiki.com/mediawiki/images/d/d5/Super_Cucumber.png"},
		{ area: 8, name: "Ghostfish", url: "https://stardewvalleywiki.com/mediawiki/images/7/72/Ghostfish.png"},
		{ area: 9, name: "Stonefish", url: "https://stardewvalleywiki.com/mediawiki/images/0/03/Stonefish.png"},
		{ area: 9, name: "Ice Pip", url: "https://stardewvalleywiki.com/mediawiki/images/6/63/Ice_Pip.png"},
		{ area: 9, name: "Lava Eel", url: "https://stardewvalleywiki.com/mediawiki/images/1/12/Lava_Eel.png"},
		{ area: 10, name: "Sandfish", url: "https://stardewvalleywiki.com/mediawiki/images/b/bb/Sandfish.png"},
		{ area: 10, name: "Scorpion Carp", url: "https://stardewvalleywiki.com/mediawiki/images/7/76/Scorpion_Carp.png"},
		{ area: 10, name: "Flounder", url: "https://stardewvalleywiki.com/mediawiki/images/8/85/Flounder.png"},
		{ area: 11, name: "Midnight Carp", url: "https://stardewvalleywiki.com/mediawiki/images/3/33/Midnight_Carp.png"},
		{ area: 11, name: "Sturgeon", url: "https://stardewvalleywiki.com/mediawiki/images/4/42/Sturgeon.png"},
		{ area: 11, name: "Tiger Trout", url: "https://stardewvalleywiki.com/mediawiki/images/0/01/Tiger_Trout.png"},
		{ area: 12, name: "Bullhead", url: "https://stardewvalleywiki.com/mediawiki/images/d/db/Bullhead.png"},
		{ area: 12, name: "Tilapia", url: "https://stardewvalleywiki.com/mediawiki/images/7/73/Tilapia.png"},
		{ area: 12, name: "Chub", url: "https://stardewvalleywiki.com/mediawiki/images/b/bd/Chub.png"},
		{ area: 13, name: "Slimejack", url: "https://stardewvalleywiki.com/mediawiki/images/3/34/Slimejack.png"},
		{ area: 13, name: "Void Salmon", url: "https://stardewvalleywiki.com/mediawiki/images/a/ad/Void_Salmon.png"},
		{ area: 13, name: "Blue Discus", url: "https://stardewvalleywiki.com/mediawiki/images/e/ee/Blue_Discus.png"},
	]
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
		let durability = areaPlayer * 2
		let coins = areaPlayer * 50
		let exp = areaPlayer * 20

		player.fishingroddurability -= durability
		player.lastfishing = new Date * 1 // waktu fish 4menit

		if (player.fishingroddurability < 0) {
            player.fishingrod = 0
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
			body: 'wibu',
			thumbnail: await (await fetch(url)).buffer() ,
			sourceUrl: 'http://raiden-bot.ga/'}}})
	} else throw `Tunggu *${cd1}:${cd2}* Untuk Memancing Lagi`
}

handler.help = ['fish']
handler.tags = ['rpg']
handler.command = /^fish/i
handler.fishingrod = 1


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