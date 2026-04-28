import { Resend } from 'resend';

function getResend(): Resend {
  return new Resend(process.env.RESEND_API_KEY || 'placeholder');
}

function getFrom(): string {
  const raw = process.env.EMAIL_FROM || 'noreply@idealstate.co';
  const angleMatch = raw.match(/<([^>]+)>/);
  const address = angleMatch ? angleMatch[1].trim() : raw.trim();
  return `Chessy <${address}>`;
}

export async function sendMagicLinkEmail(to: string, magicLinkUrl: string): Promise<boolean> {
  try {
    await getResend().emails.send({
      from: getFrom(),
      to,
      subject: 'Sign in to Chessy',
      html: [
        '<!DOCTYPE html><html><head><meta charset="utf-8"></head>',
        '<body style="margin:0;padding:0;background:#f9f9f9;">',
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9f9;">',
        '<tr><td align="center" style="padding:40px 20px;">',
        '<table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;">',
        '<tr><td style="padding:40px 32px;font-family:Helvetica Neue,Arial,sans-serif;">',
        '<h2 style="color:#102D7B;margin:0 0 16px;">Chessy</h2>',
        '<p style="color:#444;font-size:16px;line-height:1.6;">Click the button below to sign in.</p>',
        '<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0;">',
        `<tr><td style="background:#ED5926;border-radius:6px;"><a href="${magicLinkUrl}" target="_blank" style="display:inline-block;padding:14px 32px;color:#fff;font-size:16px;font-weight:600;text-decoration:none;">Sign In</a></td></tr>`,
        '</table>',
        '<p style="color:#999;font-size:13px;">This link expires in 15 minutes.</p>',
        '</td></tr></table></td></tr></table></body></html>',
      ].join(''),
    });
    return true;
  } catch (err) {
    console.error('Failed to send magic link email:', err);
    return false;
  }
}
