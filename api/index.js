export default async function handler(req, res) {
  const BOT_TOKEN = "8051100730:AAEd1EQcHTrmw9YNMA0DuXlgabs7jmM0yo8"; 
  const CHAT_ID = "5425526761";

  const q = req.query;

  // Helper function
  async function tg(method, data) {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/${method}`, {
      method: "POST",
      body: new URLSearchParams(data)
    });
    return await response.json();
  }

  // TEXT
  if (q.msg && !q.photo && !q.video && !q.audio && !q.doc && !q.gif && !q.sticker) {
    return res.status(200).json(await tg("sendMessage", {
      chat_id: CHAT_ID,
      text: q.msg
    }));
  }

  // PHOTO
  if (q.photo) {
    return res.status(200).json(await tg("sendPhoto", {
      chat_id: CHAT_ID,
      photo: q.photo,
      caption: q.msg || ""
    }));
  }

  // VIDEO
  if (q.video) {
    return res.status(200).json(await tg("sendVideo", {
      chat_id: CHAT_ID,
      video: q.video,
      caption: q.msg || ""
    }));
  }

  // AUDIO
  if (q.audio) {
    return res.status(200).json(await tg("sendAudio", {
      chat_id: CHAT_ID,
      audio: q.audio,
      caption: q.msg || ""
    }));
  }

  // VOICE
  if (q.voice) {
    return res.status(200).json(await tg("sendVoice", {
      chat_id: CHAT_ID,
      voice: q.voice,
      caption: q.msg || ""
    }));
  }

  // DOCUMENT
  if (q.doc) {
    return res.status(200).json(await tg("sendDocument", {
      chat_id: CHAT_ID,
      document: q.doc,
      caption: q.msg || ""
    }));
  }

  // GIF / ANIMATION
  if (q.gif) {
    return res.status(200).json(await tg("sendAnimation", {
      chat_id: CHAT_ID,
      animation: q.gif,
      caption: q.msg || ""
    }));
  }

  // STICKER
  if (q.sticker) {
    return res.status(200).json(await tg("sendSticker", {
      chat_id: CHAT_ID,
      sticker: q.sticker
    }));
  }

  // LOCATION
  if (q.lat && q.lng) {
    return res.status(200).json(await tg("sendLocation", {
      chat_id: CHAT_ID,
      latitude: q.lat,
      longitude: q.lng
    }));
  }

  // CONTACT
  if (q.phone && q.name) {
    return res.status(200).json(await tg("sendContact", {
      chat_id: CHAT_ID,
      phone_number: q.phone,
      first_name: q.name
    }));
  }

  // DEFAULT
  return res.status(400).json({
    status: "error",
    message:
      "Supported: msg, photo, video, audio, voice, doc, gif, sticker, lat+lng, phone+name"
  });
}
