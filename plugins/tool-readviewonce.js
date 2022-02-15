let handler = async (m, { conn }) => {
    if (!m.quoted) throw 'where\'s message?'
    if (m.quoted.mtype !== 'viewOnceMessage') throw 'Itu bukan pesan viewOnce'
    await conn.copyNForward(m.chat, await conn.loadMessage(m.quoted.id), false, { readViewOnce: true })
}

handler.help = ['readviewonce']
handler.tags = ['tools']
handler.command = /^readviewonce/i

export default handler