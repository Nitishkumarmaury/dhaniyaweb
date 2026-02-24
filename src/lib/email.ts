import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    await transporter.sendMail({
      from: `"Dhanya Trader's" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error };
  }
}

export function getInquiryNotificationEmail(inquiry: {
  name: string;
  company?: string;
  email: string;
  phone: string;
  product: string;
  quantity?: string;
  message?: string;
  gst?: string;
}) {
  return {
    to: process.env.NOTIFICATION_EMAIL || 'Dhanyatraders06@gmail.com',
    subject: `New Inquiry: ${inquiry.product} — ${inquiry.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0A4D8C; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .body { background: #f9f9f9; padding: 20px; border: 1px solid #e0e0e0; }
          .footer { background: #f0f0f0; padding: 15px; border-radius: 0 0 8px 8px; font-size: 12px; color: #666; }
          .field { margin-bottom: 12px; }
          .label { font-weight: bold; color: #0A4D8C; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin:0">📋 New Product Inquiry</h2>
          </div>
          <div class="body">
            <div class="field">
              <span class="label">Name:</span> ${inquiry.name}
            </div>
            <div class="field">
              <span class="label">Company:</span> ${inquiry.company || 'N/A'}
            </div>
            <div class="field">
              <span class="label">Email:</span> ${inquiry.email}
            </div>
            <div class="field">
              <span class="label">Phone:</span> ${inquiry.phone}
            </div>
            ${inquiry.gst ? `<div class="field"><span class="label">GST:</span> ${inquiry.gst}</div>` : ''}
            <div class="field">
              <span class="label">Product:</span> ${inquiry.product}
            </div>
            <div class="field">
              <span class="label">Quantity:</span> ${inquiry.quantity || 'Not specified'}
            </div>
            ${inquiry.message ? `<div class="field"><span class="label">Message:</span><br>${inquiry.message}</div>` : ''}
          </div>
          <div class="footer">
            This inquiry was submitted via the Dhanya Trader's website.
          </div>
        </div>
      </body>
      </html>
    `,
  };
}

export function getContactNotificationEmail(contact: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  return {
    to: process.env.NOTIFICATION_EMAIL || 'Dhanyatraders06@gmail.com',
    subject: `Contact Form: ${contact.subject || 'General Inquiry'} — ${contact.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0A4D8C; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .body { background: #f9f9f9; padding: 20px; border: 1px solid #e0e0e0; }
          .footer { background: #f0f0f0; padding: 15px; border-radius: 0 0 8px 8px; font-size: 12px; color: #666; }
          .field { margin-bottom: 12px; }
          .label { font-weight: bold; color: #0A4D8C; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin:0">✉️ New Contact Message</h2>
          </div>
          <div class="body">
            <div class="field">
              <span class="label">Name:</span> ${contact.name}
            </div>
            <div class="field">
              <span class="label">Email:</span> ${contact.email}
            </div>
            <div class="field">
              <span class="label">Phone:</span> ${contact.phone || 'N/A'}
            </div>
            <div class="field">
              <span class="label">Subject:</span> ${contact.subject || 'General'}
            </div>
            <div class="field">
              <span class="label">Message:</span><br>${contact.message}
            </div>
          </div>
          <div class="footer">
            This message was submitted via the Dhanya Trader's website contact form.
          </div>
        </div>
      </body>
      </html>
    `,
  };
}
