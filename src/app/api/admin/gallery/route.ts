import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get('file') as File;
    const caption = formData.get('caption') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file' }, { status: 400 });
    }

    const fileName = `${Date.now()}-${file.name}`;

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('gallery')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/${fileName}`;

    // Save to DB
    const { error: dbError } = await supabase
      .from('gallery')
      .insert([{ image_url: imageUrl, caption }]);

    if (dbError) throw dbError;

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}