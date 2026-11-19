DOUBLE CASH PAYMENT PORTAL
==========================

WHAT THIS IS
A responsive Nigerian Naira payment portal. Customers can open the site, enter their details and amount, and pay through Paystack. The share button creates a link carrying the selected amount and description.

IMPORTANT
This is a deployable starter project, not yet a live public payment URL. It becomes live after you deploy it and configure your Paystack SECRET key. Never put your Paystack secret key in index.html, a public GitHub repository, or share it with customers.

DEPLOY WITH VERCEL
1. Create/sign in to a Vercel account at https://vercel.com.
2. Create a GitHub repository and upload the contents of this ZIP (not the ZIP file itself).
3. In Vercel choose Add New > Project and import that repository.
4. In Project Settings > Environment Variables, add:
   Name: PAYSTACK_SECRET_KEY
   Value: your Paystack LIVE secret key (starts with sk_live_...)
   Keep it private. Do not send it to anyone.
5. Redeploy the project after adding the variable.
6. Open the Vercel domain provided (for example double-cash-....vercel.app).
7. Test with Paystack test keys first. Switch to live mode only after your Paystack account is fully activated and the portal has been tested.

SHARING
Open your deployed site, enter an amount and description, then tap "Share this payment link". The copied link can be sent by WhatsApp, SMS or social media. Customers can edit the amount before paying; this is a general collection link, not a locked invoice.

PAYMENT RECORDS
Use your Paystack Dashboard to view and reconcile transactions. Do not treat a browser redirect alone as proof of payment; verify the transaction in your Paystack Dashboard. The portal's return page also calls the server-side verification endpoint.

CUSTOMIZATION
The display name is currently Double Cash. The minimum amount is ₦100. The project uses Vercel serverless functions and does not require you to maintain your own server.

SECURITY NOTES
- Never share your Paystack secret key.
- Use HTTPS (Vercel provides it).
- Verify payments in Paystack before releasing goods/services.
- For production use, add a verified Paystack webhook and persistent order/customer records if you need automated fulfilment or an admin transaction dashboard.
