import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendDonationReceipt } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.event !== 'charge.success') {
      return NextResponse.json({ received: true });
    }

    const payment = body.data;
    const reference = payment.reference;

    const email = payment.customer?.email;

    if (!email) {
      console.error('No customer email found in Paystack payload');
      return NextResponse.json({ success: false }, { status: 400 });
    }

    // prevent duplicates
    const { data: existing } = await supabase
      .from('donations')
      .select('id')
      .eq('reference', reference)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ success: true, duplicate: true });
    }

    // save to DB
    const { error } = await supabase.from('donations').insert([
      {
        reference,
        amount: payment.amount / 100,
        email,
        status: payment.status,
        metadata: payment.metadata,
      },
    ]);

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ success: false }, { status: 500 });
    }

    // send email receipt
    await sendDonationReceipt({
      email,
      amount: payment.amount / 100,
      reference,
      project: payment.metadata?.project,
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}