// app/api/support/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend'; // ✅ ADDED

const resend = new Resend(process.env.RESEND_API_KEY); // ✅ ADDED

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from('support_requests')
      .insert([{
        fullName: body.fullName,
        phone: body.phone,
        email: body.email || null,
        age: body.age || null,
        gender: body.gender,
        issue: body.issue,
        preferredContact: body.preferredContact,
      }])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to save request' },
        { status: 500 }
      );
    }

    console.log('Support request saved:', data);

    // ============================
    // ✅ SEND EMAIL TO ADMIN (TERUF)
    // ============================
    await resend.emails.send({
      from: 'TERUF Support <onboarding@resend.dev>', // default works for testing
      to: process.env.ADMIN_EMAIL!,
      subject: 'New Counseling Request Received',
      html: `
        <h2>New Counseling Request</h2>
        <p><strong>Name:</strong> ${body.fullName}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Email:</strong> ${body.email || 'Not provided'}</p>
        <p><strong>Age:</strong> ${body.age || 'Not provided'}</p>
        <p><strong>Gender:</strong> ${body.gender}</p>
        <p><strong>Preferred Contact:</strong> ${body.preferredContact}</p>
        <p><strong>Issue:</strong></p>
        <p>${body.issue}</p>
      `,
    });

    // ============================
    // ✅ OPTIONAL: SEND CONFIRMATION EMAIL TO USER
    // ============================
    if (body.email) {
      await resend.emails.send({
        from: 'TERUF Support <onboarding@resend.dev>',
        to: body.email,
        subject: 'Your Counseling Request Has Been Received',
        html: `
          <p>Dear ${body.fullName},</p>
          <p>Thank you for reaching out to TERUF.</p>
          <p>Your request has been received and a counselor will contact you within 48 hours.</p>
          <p>This service is completely confidential.</p>
          <br/>
          <p><strong>TERUF Team</strong></p>
        `,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Request received successfully. A counselor will contact you soon.',
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}