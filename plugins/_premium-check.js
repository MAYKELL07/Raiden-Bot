let handler = m => m
handler.before = async (m, { conn, isPrems , isOwner }) => {
	if (isPrems) {
    if (isOwner) return
    if (new Date() * 1 >= global.DATABASE.data.users[m.sender].premiumDate) {
      conn.reply(m.chat, "*Maaf waktu untuk status premium anda telah berakhir :(*\n*Chat owner untuk upgrade premium lagi*", m).then(() => {
        global.DATABASE.data.users[m.sender].premium = false
        let name = 'Maykell'
        let number = global.owner[1]
        conn.sendVcard(m.chat, name, number)
      })
    }
  }
}
module.exports = handler