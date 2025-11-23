export default async function handler(req, res) {
  const BOT_TOKEN = "6302773252:AAEPCh69oRzT8_7BCE-vy80btGX3xmR2X5Y";  // replace with NEW token
  const CHAT_ID = "6302773252";

  const msg = req.query.msg || null;
  const img = req.query.img || null;

  // --------- SEND TEXT ----------
  if (msg && !img) {
    const url = https://api.telegram.org/bot${BOT_TOKEN}/sendMessage;
    const response = await fetch(url, {
      method: "POST",
      body: new URLSearchParams({
        chat_id: CHAT_ID,
        text: msg
      })
    });
    const data = await response.json();
    return res.status(200).json(data);
  }

  // --------- SEND IMAGE ----------
  if (img) {
    const url = https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto;
    const response = await fetch(url, {
      method: "POST",
      body: new URLSearchParams({
        chat_id: CHAT_ID,
        photo: img,
        caption: msg || ""
      })
    });
    const data = await response.json();
    return res.status(200).json(data);
  }

  // --------- DEFAULT ----------
  return res.status(400).json({
    status: "error",
    msg: "Use ?msg=TEXT or ?img=IMAGE_URL"
  });
}
