export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { nama, menu } = req.body;

  if (!nama || !menu) {
    return res.status(400).json({ error: "Nama dan menu wajib diisi" });
  }

  // Kirim ke Telegram
  const token = process.env.TELEGRAM_TOKEN;
  const chatId = process.env.CHAT_ID;
  const text = `🛒 Pesanan Baru:\n👤 Nama: ${nama}\n🍽️ Menu: ${menu}\n🕒 Waktu: ${new Date().toLocaleString("id-ID")}`;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    return res.status(200).json({ success: true, message: "Pesanan dikirim" });
  } catch (err) {
    console.error("Gagal kirim ke Telegram:", err);
    return res.status(500).json({ error: "Gagal kirim ke Telegram" });
  }
}
