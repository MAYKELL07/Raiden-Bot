import translate from 'translate-google'
let handler = async (m, { conn, text, usedPrefix, command }) => {
    translate('wanna fuck together?', {to: 'id', }).then(res => {
        console.log(res)
        m.reply(res)
    }).catch(err => {
        m.reply(err)
    })
}
handler.help = ['ngetes']
handler.tags = ['cum']

handler.command = /^(cum)$/i

export default handler