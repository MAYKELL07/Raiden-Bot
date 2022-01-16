let handler = async (m, { conn, text, participants, usedPrefix, command }) => {
    const cooldown = new Set()
    if (cooldown.has(m.chat)) throw "tunggu 1 menit"
    console.log("berhasil")
    cooldown.add(m.chat)
    setTimeout(() => {
      cooldown.delete(m.chat);
    }, 60000);
}

handler.command = /^(tetet)$/i
module.exports = handler