const http = require("http");

const PORT = process.env.PORT || 3000;

const html = `
<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ajneshwar Enterprises</title>
  <meta name="description" content="Ajneshwar Enterprises - Order online">
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      background: #f7f7f7;
      color: #222;
    }
    header {
      background: #111;
      color: white;
      padding: 25px;
      text-align: center;
    }
    main {
      max-width: 600px;
      margin: 40px auto;
      padding: 25px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 15px #ddd;
    }
    input, textarea, button {
      width: 100%;
      box-sizing: border-box;
      padding: 14px;
      margin: 8px 0 16px;
      border-radius: 8px;
      border: 1px solid #ccc;
      font-size: 16px;
    }
    button {
      background: #25D366;
      color: white;
      border: none;
      cursor: pointer;
      font-weight: bold;
    }
    button:hover {
      background: #1ebe5d;
    }
  </style>
</head>
<body>

<header>
  <h1>Ajneshwar Enterprises</h1>
  <p>Online Order Karein</p>
</header>

<main>
  <h2>Order Form</h2>

  <form onsubmit="sendOrder(event)">
    <label>Aapka Naam</label>
    <input id="name" type="text" required>

    <label>Mobile Number</label>
    <input id="phone" type="tel" required>

    <label>Kya Order Karna Hai?</label>
    <textarea id="order" required></textarea>

    <button type="submit">WhatsApp Par Order Bhejein</button>
  </form>
</main>

<script>
function sendOrder(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const order = document.getElementById("order").value;

  const message =
    "New Order%0A%0A" +
    "Name: " + encodeURIComponent(name) + "%0A" +
    "Mobile: " + encodeURIComponent(phone) + "%0A" +
    "Order: " + encodeURIComponent(order);

  // Yahan apna WhatsApp number daalna hai
  const businessNumber = "919414134991";

  window.open(
    "https://wa.me/" + businessNumber + "?text=" + message,
    "_blank"
  );
}
</script>

</body>
</html>
`;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("Website running on port " + PORT);
});
