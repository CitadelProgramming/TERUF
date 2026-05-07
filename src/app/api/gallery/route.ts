// app/api/gallery/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Gallery fetch error:', error);
    return NextResponse.json([], { status: 500 });
  }
}

// Optional: Allow admin to add new gallery items
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from('gallery')
      .insert([body])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Gallery insert error:', error);
    return NextResponse.json({ success: false, error: 'Failed to add item' }, { status: 500 });
  }
}