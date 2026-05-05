import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// 📌 GET: Admin fetch support requests
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('support_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(data || []);
  } catch (err) {
    console.error(err);
    return NextResponse.json([], { status: 500 });
  }
}

// 📌 POST: User submits support request + admin email alert
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      fullName,
      phone,
      email,
      age,
      gender,
      issue,
      preferredContact,
    } = body;

    // 1. Save to Supabase
    const { data, error } = await supabase
      .from('support_requests')
      .insert([
        {
          fullName,
          phone,
          email,
          age,
          gender,
          issue,
          preferredContact,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Insert error:', error);
      return NextResponse.json(
        { success: false },
        { status: 500 }
      );
    }

    // 2. Send EMAIL NOTIFICATION to admin
    await resend.emails.send({
      from: 'TERUF Alerts <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL!,
      subject: `🚨 New Support Request from ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>New Support Request Received</h2>

          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Age:</strong> ${age}</p>
          <p><strong>Gender:</strong> ${gender}</p>

          <hr />

          <p><strong>Issue:</strong></p>
          <p>${issue}</p>

          <hr />

          <p><strong>Preferred Contact:</strong> ${preferredContact}</p>

          <br/>
          <p>Log into admin dashboard to respond.</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      data,
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}