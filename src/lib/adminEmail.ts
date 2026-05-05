import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendSupportAdminNotification(request: {
  fullName: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
  issue: string;
  preferredContact: string;
}) {
  try {
    await resend.emails.send({
      from: 'TERUF Alerts <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL!,
      subject: `🚨 New Support Request from ${request.fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>New Support Request</h2>

          <p><strong>Name:</strong> ${request.fullName}</p>
          <p><strong>Email:</strong> ${request.email}</p>
          <p><strong>Phone:</strong> ${request.phone}</p>
          <p><strong>Age:</strong> ${request.age}</p>
          <p><strong>Gender:</strong> ${request.gender}</p>

          <hr />

          <p><strong>Issue:</strong></p>
          <p>${request.issue}</p>

          <hr />

          <p><strong>Preferred Contact:</strong> ${request.preferredContact}</p>

          <br/>
          <p>Login to admin dashboard to respond.</p>
        </div>
      `,
    });

  } catch (error) {
    console.error('Admin email error:', error);
  }
}