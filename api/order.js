export default async function handler(req, res) {
  const { nama, wa, menu } = req.body;
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.CHAT_ID;

  const waktu = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
  const msg = `🍽️ *Pesanan Masuk*\n👤 Nama: ${nama}\n📱 WA: ${wa}\n🍔 Menu: ${menu}\n⏰ Waktu: ${waktu}`;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: msg,
        parse_mode: "Markdown"
      })
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Gagal kirim ke Telegram" });
  }
}
