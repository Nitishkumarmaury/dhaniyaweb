const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

async function sendTelegramMessage(text: string) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text,
      parse_mode: 'HTML',
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('Telegram send error:', err);
    return { success: false, error: err };
  }

  return { success: true };
}

export function sendInquiryTelegram(inquiry: {
  name: string;
  company?: string;
  email: string;
  phone: string;
  product: string;
  quantity?: string;
  message?: string;
  gst?: string;
}) {
  const lines = [
    `📋 <b>New Product Inquiry</b>`,
    ``,
    `<b>Name:</b> ${inquiry.name}`,
    `<b>Company:</b> ${inquiry.company || 'N/A'}`,
    `<b>Email:</b> ${inquiry.email}`,
    `<b>Phone:</b> ${inquiry.phone}`,
    inquiry.gst ? `<b>GST:</b> ${inquiry.gst}` : '',
    `<b>Product:</b> ${inquiry.product}`,
    `<b>Quantity:</b> ${inquiry.quantity || 'Not specified'}`,
    inquiry.message ? `\n<b>Message:</b>\n${inquiry.message}` : '',
    ``,
    `<i>— Dhanya Trader's Website</i>`,
  ].filter(Boolean);

  return sendTelegramMessage(lines.join('\n'));
}

export function sendContactTelegram(contact: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  const lines = [
    `✉️ <b>New Contact Message</b>`,
    ``,
    `<b>Name:</b> ${contact.name}`,
    `<b>Email:</b> ${contact.email}`,
    `<b>Phone:</b> ${contact.phone || 'N/A'}`,
    `<b>Subject:</b> ${contact.subject || 'General'}`,
    `\n<b>Message:</b>\n${contact.message}`,
    ``,
    `<i>— Dhanya Trader's Website Contact Form</i>`,
  ];

  return sendTelegramMessage(lines.join('\n'));
}
