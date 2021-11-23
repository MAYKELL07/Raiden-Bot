const Transfer = 1
let handler = async (m, { conn, command, args }) => {
  let count = command.replace(/^dep/i, '')
  let user = global.db.data.users[m.sender]
  let banklimit = user.banklimit
  count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].money / Transfer) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)
  if (isNaN(count)) throw `jumlah Deposit harus bilangan bulat contoh: .dep 5000`
  if (user.bank > banklimit) throw 'Rekening anda Sudah Penuh'
  if (global.db.data.users[m.sender].money >= Transfer * count) {
    global.db.data.users[m.sender].money -= Transfer * count
    global.db.data.users[m.sender].bank += count
    conn.reply(m.chat, `Kamu menyetorkan ${count} `, m)
  } else conn.reply(m.chat, `Uang anda Tidak Cukup`, m)
  if (user.bank > banklimit) {
    let left = user.bank - banklimit
    user.money += left
    user.bank -= left
  }
}
handler.help = ['dep<jumlah>', 'dep <jumlah>', 'depall']
handler.tags = ['economy']
handler.command = /^dep([1-9999999]+)|dep|deposit|depall$/i
handler.owner = false
handler.register = true
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0

module.exports = handler

