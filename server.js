const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;
const ORDERS_FILE = path.join(__dirname, "orders.json");

app.use(express.json());
app.use(express.static(__dirname));

function readOrders() {
  try { return JSON.parse(fs.readFileSync(ORDERS_FILE, "utf8")); }
  catch { return []; }
}
function writeOrders(orders) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

app.post("/api/orders", (req, res) => {
  const {name, phone, address, note, items, subtotal, delivery, total, payment} = req.body || {};

  if (!name || !/^[6-9]\d{9}$/.test(String(phone || "")) ||
      !address || !Array.isArray(items) || !items.length) {
    return res.status(400).json({ok:false, message:"Invalid order details."});
  }

  const orders = readOrders();
  const order = {
    id: "AJ-" + Date.now().toString().slice(-8),
    createdAt: new Date().toISOString(),
    name: String(name).trim(),
    phone: String(phone).trim(),
    address: String(address).trim(),
    note: String(note || "").trim(),
    items,
    subtotal: Number(subtotal) || 0,
    delivery: Number(delivery) || 0,
    total: Number(total) || 0,
    payment: payment === "upi" ? "UPI / Online Payment" : "Cash on Delivery (COD)"
  };

  orders.unshift(order);
  writeOrders(orders);
  res.json({ok:true, order});
});

app.get("/api/orders", (req, res) => res.json(readOrders()));
app.get("/admin", (req, res) => res.sendFile(path.join(__dirname, "admin.html")));

app.listen(PORT, () => {
  console.log(`Ajneshwar Enterprises: http://localhost:${PORT}`);
});
