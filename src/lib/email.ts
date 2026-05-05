import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendDonationReceipt({
  email,
  amount,
  reference,
  project,
}: {
  email: string;
  amount: number;
  reference: string;
  project?: string;
}) {
  try {
    const data = await resend.emails.send({
      from: 'TERUF Donations <onboarding@resend.dev>',
      to: email,
      subject: 'Donation Received – Thank You for Supporting TERUF ❤️',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Thank You for Your Donation ❤️</h2>

          <p>We have successfully received your donation.</p>

          <hr />

          <p><strong>Amount:</strong> ₦${amount}</p>
          <p><strong>Reference:</strong> ${reference}</p>
          <p><strong>Project:</strong> ${project || 'General Support'}</p>

          <hr />

          <p>Your support helps us provide sexual and reproductive health education, counseling, and outreach programs across Nigeria.</p>

          <p>— TERUF Team</p>
        </div>
      `,
    });

    console.log('📧 Email sent:', data);
  } catch (error) {
    console.error('❌ Email error:', error);
  }
}