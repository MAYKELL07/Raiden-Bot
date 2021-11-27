let handler = async (m, { conn, text }) => {
    let msgerror = (pickRandom(['Error', 'astagfirullah error', 'Nice Error', 'Salah format keknya :v', 'error bro', 'Kocak error :v', 'wtf error :v', 'Ciaaa error', 'error cuyy', 'dahlah (emot batu) error']))
    try {
    let player = global.db.data.users[m.sender]

    switch (difficulty) {
        case 'easy':
            let monsters = [
                { name: "Goblin" },
                { name: "Slime" },
                { name: "Wolf" },
                { name: "Nymph" },
                { name: "Skeleton" },
                { name: "Wolf" },
                { name: "Baby Demon" },
                { name: "Ghost" },
                { name: "Zombie" },
                { name: "Imp" },
                { name: "Witch" },
                { name: "Zombie" },
                { name: "Ghoul" },
                { name: "Giant Scorpion" },
                { name: "Unicorn" },
            ]
            let monster = area_monsters[Math.floor(Math.random() * area_monsters.length)]
            let monsterName = monster.name.toUpperCase()
            let mosnterlevel = Math.floor(Math.random() * 11);

            if (new Date -  player.lastdungeon > 120000) {
                let sum = 10 * mosnterlevel - 50
                let dmg = (player.sword  * 5 + player.armor * 5 - sum + mosnterlevel) 
                dmg = dmg < 0 ? Math.abs(dmg) : 0
                let coins = areaPlayer * 50
                let exp = areaPlayer * 20

                player.healt -= dmg
                player.lastdungeon = new Date * 1 // waktu hunt 2menit

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

                let pesan = `*${pname}* Menemukan Dan Membunuh *${monsterName}*\nMendapatkan ${new Intl.NumberFormat('en-US').format(coins)} coins & ${new Intl.NumberFormat('en-US').format(exp)} XP\nBerkurang -${dmg}Hp, Tersisa ${player.healt}/${100}`
                m.reply(pesan)
            } else throw `Tunggu *${cd1}:${cd2}* Untuk Berburu Lagi`
        break
    }
    } catch (e) {
    console.log(e)
    conn.reply(m.chat, msgerror, m)
    if (DevMode) {
        let file = require.resolve(__filename)
        for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
            conn.sendMessage(jid, file + ' error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
        }
    }
    }



	
	let pname = conn.getName(m.sender)

	let cdm = `${MeNit(new Date - player.lastdungeon)}`
	let cds = `${DeTik(new Date - player.lastdungeon)}`
	let cd1 = Math.ceil(01 - cdm)
	let cd2 = Math.ceil(60 - cds)


	let areaPlayer = monsters.map(v => v.area)
    areaPlayer = areaPlayer[Math.floor(Math.random() * areaPlayer.length)]
	let area_monsters = monsters.filter(monster => { return monster.area === areaPlayer })
	let monster = area_monsters[Math.floor(Math.random() * area_monsters.length)]
	let monsterName = monster.name.toUpperCase()
    

	if (new Date -  global.db.data.users[m.sender].lastdungeon > 120000) {
		let sum = 10 * areaPlayer - 59
		let dmg = (player.sword  * 5 + player.armor * 5 - sum)
		dmg = dmg < 0 ? Math.abs(dmg) : 0
		let coins = areaPlayer * 50
		let exp = areaPlayer * 20

		player.healt -= dmg
		player.lastdungeon = new Date * 1 // waktu hunt 2menit

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

		let pesan = `*${pname}* Menemukan Dan Membunuh *${monsterName}*\nMendapatkan ${new Intl.NumberFormat('en-US').format(coins)} coins & ${new Intl.NumberFormat('en-US').format(exp)} XP\nBerkurang -${dmg}Hp, Tersisa ${player.healt}/${100}`
		m.reply(pesan)
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