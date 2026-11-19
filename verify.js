export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  const secret = process.env.PAYSTACK_SECRET_KEY;
  const reference = String(req.query.reference || "");
  if (!secret || !reference) return res.status(400).json({ status: "failed" });
  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${secret}` }
    });
    const result = await response.json();
    if (!response.ok || !result.status || result.data.status !== "success") {
      return res.status(200).json({ status: "failed" });
    }
    return res.status(200).json({ status: "success", reference: result.data.reference, amount: result.data.amount, currency: result.data.currency });
  } catch {
    return res.status(500).json({ status: "pending" });
  }
}