export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end("Metode tidak diizinkan");
  }

  const { nama } = req.body;
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.CHAT_ID;

  const waktu = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
  const pesan = `👤 *Login Baru*\nNama: ${nama}\n⏰ Waktu: ${waktu}`;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: pesan,
        parse_mode: "Markdown"
      })
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Gagal mengirim login ke Telegram" });
  }
}
