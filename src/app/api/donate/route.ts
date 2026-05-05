import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const reference = `teruf_${Date.now()}`;

    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: body.email, // ✅ REQUIRED NOW
        amount: body.amount * 100,
        reference,
        callback_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/success`,
        metadata: {
          project: body.project,
          recurring: body.recurring,
        },
        channels: ['card', 'bank', 'ussd', 'mobile_money'],
      }),
    });

    const data = await response.json();

    if (!data.status || !data.data?.authorization_url) {
      console.error('Paystack init error:', data);
      return NextResponse.json({ success: false }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      authorization_url: data.data.authorization_url,
      reference,
    });

  } catch (error) {
    console.error('Donate route error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}