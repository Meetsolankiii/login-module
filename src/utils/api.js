const API_BASE = "/api";

export async function request2FaToken(emailAddress) {
  const response = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: emailAddress })
  });
  return response.json();
}

export async function confirm2FaToken(emailAddress, inputCode) {
  const response = await fetch(`${API_BASE}/verify-2fa`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: emailAddress, otp: inputCode })
  });
  return response.json();
}