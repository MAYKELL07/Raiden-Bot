let handler = async m => m.reply(`
*LINK GROUP Raiden NIH KAK=*
https://chat.whatsapp.com/BpFepEz4W2UG1upSkY1AcK

NOTE : _JANGAN RUSUH KARNA GC_
_Raiden CUMAN BUAT MENGKODENG DOANG :'v_
`.trim()) // Tambah sendiri kalo mau
handler.help = ['botgroup']
handler.tags = ['about']
handler.command = /^bot(gc|group)$/i

module.exports = handler
