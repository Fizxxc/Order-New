export default function handler(req, res) {
  const menus = [
    { nama: "Ayam Geprek", stok: 3 },
    { nama: "Nasi Goreng", stok: 0 },
    { nama: "Mie Goreng", stok: 2 },
    { nama: "Es Teh", stok: 5 },
    { nama: "Kopi Susu", stok: 1 },
  ];

  res.status(200).json({ menus });
}
