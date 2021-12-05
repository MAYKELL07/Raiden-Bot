let handler = async (m, { conn, args, usedPrefix, DevMode }) => {
    let targetuser =  m.mentionedJid ? m.mentionedJid[0] : (args[0].replace(/[@ .+-]/g, '').replace(' ', '') + '@s.whatsapp.net')
    if(!m.mentionedJid || !args[0]) throw 'Tag salah satu, atau ketik Nomernya!!'
    let user = global.db.data.users[m.sender]
    let iser = global.db.data.users[targetuser]
    let randomizer = `${Math.floor(Math.random() * 10)}`.trim()
    let percentX = 30
    let hasil = Math.floor(percentCalculation(iser.money, percentX))
    let hasil2 = Math.floor(percentCalculation(user.money, percentX))
    let cdm = `${MeNit(new Date - user.lastrob)}`
	let cds = `${DeTik(new Date - user.lastrob)}`
	let cd1 = Math.ceil(01 - cdm)
	let cd2 = Math.ceil(60 - cds)
    if (new Date - user.lastrob > 120000) {
        if (iser.money < 1) throw 'Dia Tidak Punya Uang'
        if (user.money > 250) {
            user.lastrob = new Date * 1
            if (randomizer > 5) {
            // berhasil cok
            user.money += hasil
            iser.money -= hasil
            conn.reply(m.chat, `Kamu berhasil mencuri ${hasil} `.trim(), m)
            } 
            if (randomizer < 3) {
            // gagal
            user.money -= 250
            conn.reply(m.chat, `Kamu Gagal mencuri, Uang kamu berkurang 250`.trim(), m)
            } else {
            //ditangkap polisi
            user.money -= hasil2
            conn.reply(m.chat, `Kamu Di tangkap Satpoll PP, kamu membayar biaya ${hasil2} untuk keluar `.trim(), m)
            } 
        } else conn.reply(m.chat, `Uang Anda Tidak Cukup Untuk Mencuri`.trim(), m)
    } else conn.reply(m.chat, `anda sudah lelah setelah mencuri, silahkan coba *${cd1}:${cd2}* lagi`.trim(), m)
}

handler.help = ['rob <args>','curi <args>']
handler.tags = ['economy']
handler.command = /^(rob|curi)$/
handler.register = true

module.exports = handler

function MeNit(ms) {
	let m = isNaN(ms) ? '02' : Math.floor(ms / 60000) % 60
	return [m].map(v => v.toString().padStart(2, 0)).join(':')
}

function DeTik(ms) {
	let s = isNaN(ms) ? '60' : Math.floor(ms / 1000) % 60
	return [s].map(v => v.toString().padStart(2, 0)).join(':')
}

function percentCalculation(a, b){
    var c = (parseFloat(a)*parseFloat(b))/100;
    return parseFloat(c);
  }