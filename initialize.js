export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) return res.status(500).json({ error: "Paystack has not been configured by the portal owner yet." });
  try {
    const { name, email, amount, description } = req.body || {};
    const naira = Number(amount);
    if (!name || !email || !Number.isFinite(naira) || naira < 100) {
      return res.status(400).json({ error: "Enter your name, a valid email and an amount of at least ₦100." });
    }
    const origin = req.headers.origin || `https://${req.headers.host}`;
    const callback_url = `${origin}/`;
    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        amount: String(Math.round(naira * 100)),
        currency: "NGN",
        callback_url,
        metadata: {
          customer_name: String(name).slice(0, 100),
          description: String(description || "Payment to Double Cash").slice(0, 250),
          custom_fields: [{ display_name: "Customer name", variable_name: "customer_name", value: String(name).slice(0,100) }]
        }
      })
    });
    const data = await response.json();
    if (!response.ok || !data.status) return res.status(400).json({ error: data.message || "Paystack could not initialize this payment." });
    return res.status(200).json({ authorization_url: data.data.authorization_url, reference: data.data.reference });
  } catch (e) {
    return res.status(500).json({ error: "A server error occurred. Please try again." });
  }
}