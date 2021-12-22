let handler = m => m
handler.before = async (m, {
  conn,
  isBotAdmin,
  antiVirtex,
  isAdmin
}) => {
  if (m.isGroup && !isAdmin && antiVirtex && isBotAdmin && (m.text.match(/(ผิดุท้่เึางืผิดุท้่เึางื|৭৭৭৭৭৭৭৭|๒๒๒๒๒๒๒๒|๑๑๑๑๑๑๑๑|ดุท้่เึางืผิดุท้่เึางื|𐎑⃢𝘼𝙩𝙩𝙖𝙘𝙠|۩꦳|ผิดุท้เึางื)/gi) || m.text.length >= 5000)) {
    conn.groupRemove(m.chat, [m.sender], m)
    conn.blockUser(m.sender, "add")
    conn.modifyChat(m.chat, 'delete')
    conn.reply(m.chat, `\n`.repeat(100)).then(() => {
      conn.reply(m.chat, `*Ada virtex, tanda telah dibaca dulu.*\n*Jangan lupa bersihkan chat.*`)
      conn.reply(owner[0] + "@s.whatsapp.net", `*❏ Virtex Detected from @${m.sender.split('@')[0]} on group ${conn.getName(m.chat)}*`, null, {
        contextInfo: {
          mentionedJid: [m.sender]
        }
      })
    })
  } else if (!m.isGroup && (m.text.match(/(৭৭৭৭৭৭৭৭|๒๒๒๒๒๒๒๒|๑๑๑๑๑๑๑๑|ดุท้่เึางืผิดุท้่เึางื|𐎑⃢𝘼𝙩𝙩𝙖𝙘𝙠|۩꦳|ผิดุท้เึางื)/gi) || m.text.length >= 5000)) {
    conn.blockUser(m.sender, "add").then(() => {
      conn.modifyChat(m.chat, 'delete').then(() => {
        conn.reply(owner[0] + "@s.whatsapp.net", `*❏ Virtex Detected From @${m.sender.split('@')[0]}*`, null, {
          contextInfo: {
            mentionedJid: [m.sender]
          }
        })
      })
    })
  }
}
module.exports = handler