const Transfer = 1
let handler = async (m, { conn, command, args }) => {
  let count = command.replace(/^with/i, '')
  count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].bank / Transfer) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)
  if (isNaN(count)) throw `jumlah Withdraw harus bilangan bulat contoh: .with 5000`
  if (global.db.data.users[m.sender].bank >= Transfer * count) {
    global.db.data.users[m.sender].bank -= Transfer * count
    global.db.data.users[m.sender].money += count
    conn.reply(m.chat, `Kamu menarik ${count} `, m)
  } else conn.reply(m.chat, `Uang Anda Tidak Cukup`, m)
}
handler.help = ['with<jumlah limit>', 'with <jumlah limit>', 'withall']
handler.tags = ['economy']
handler.command = /^with([1-9999999]+)|with|withdraw|withall$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.register = true

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0

module.exports = handler

