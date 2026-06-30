require('dotenv').config({ path: __dirname + '/.env' });
const nodemailer = require("nodemailer");

// In-memory runtime token cache. For production scale, map this directly to Firestore collections.
let otpCacheMemory = {};

// Configure the email provider channel transporter parameters
const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

module.exports = async (req, res) => {
  // Enable simple global CORS handling parameters
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    return res.end();
  }

  const urlPath = req.url;

  // 🚪 ROUTE A: LOGIN HANDSHAKE & OTP DISPATCH
  // ✅ FIX: Matches local '/api/login' and live Vercel '/login'
  if ((urlPath === "/api/login" || urlPath === "/login") && req.method === "POST") {
    let body = "";
    req.on("data", chunk => { body += chunk; });
    req.on("end", async () => {
      try {
        if (!body) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "Empty request parameters body received." }));
        }

        const parsedData = JSON.parse(body);
        const email = parsedData.email;

        if (!email) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "Email entry is required." }));
        }

        // Generate a 6-digit random code string token
        const pinToken = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Cache the token with an absolute 5-minute expiration window limit
        otpCacheMemory[email] = {
          token: pinToken,
          expires: Date.now() + 5 * 60 * 1000
        };

        const dispatchEnvelope = {
          from: '"Secure Identity Gateway" <solankimeet5678@gmail.com>',
          to: email,
          subject: "🔒 Multi-Factor Authentication Verification Passcode",
          html: `
            <div style="font-family: Arial, sans-serif; padding: 25px; border: 1px solid #e2e8f0; border-radius: 8px; max-width: 480px; margin: 0 auto;">
              <h2 style="color: #0f172a; margin-bottom: 5px;">2FA Security Loop Verification</h2>
              <p style="color: #475569; font-size: 14px;">Please enter the authorization validation pin code detailed below to complete your access process context:</p>
              <div style="font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #16a34a; padding: 20px 0; text-align: center; background: #f8fafc; border-radius: 6px; border: 1px solid #cbd5e1; margin: 15px 0;">
                ${pinToken}
              </div>
              <p style="color: #94a3b8; font-size: 11px; margin-top: 15px;">This parameter represents a temporary execution literal. It expires in 5 minutes.</p>
            </div>
          `
        };

        await mailTransporter.sendMail(dispatchEnvelope);
        
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ success: true, message: "2FA code sent successfully." }));

      } catch (err) {
        console.error("Internal Server parsing error details:", err);
        res.writeHead(500, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Failed to process security email tracking transactions." }));
      }
    });
  }
  
  // 🔑 ROUTE B: MULTI-FACTOR VERIFICATION
  // ✅ FIX: Matches local '/api/verify-2fa' and live Vercel '/verify-2fa'
  else if ((urlPath === "/api/verify-2fa" || urlPath === "/verify-2fa") && req.method === "POST") {
    let body = "";
    req.on("data", chunk => { body += chunk; });
    req.on("end", () => {
      try {
        if (!body) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "Empty request parameters body received." }));
        }

        const { email, otp } = JSON.parse(body);
        const record = otpCacheMemory[email];

        if (!record) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "No active multi-factor tracking transactions found for this profile." }));
        }

        if (Date.now() > record.expires) {
          delete otpCacheMemory[email];
          res.writeHead(401, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: "The authorization parameter token lifetime context has expired." }));
        }

        if (record.token === otp) {
          delete otpCacheMemory[email]; // Consume immediately
          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ authenticated: true }));
        }

        res.writeHead(401, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "The verification passcode token entry is incorrect." }));
        
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Failed to process verification parsing." }));
      }
    });
  }

  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Endpoint context route not found");
  }
};

// 💻 LOCAL DEVELOPMENT RUNNER FALLBACK SWITCH
if (process.env.NODE_ENV !== 'production') {
  const http = require('http');
  const server = http.createServer(module.exports);
  server.listen(3001, () => {
    console.log('🚀 Local security API backend running at http://localhost:3001');
  });
}