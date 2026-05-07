// app/api/gallery/upload/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const date = formData.get('date') as string;
    const location = formData.get('location') as string;
    const image = formData.get('image') as File;

    if (!title || !description || !category || !date || !location || !image) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Upload image to Supabase Storage
    const fileExt = image.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('gallery')
      .upload(fileName, image, { upsert: true });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('gallery')
      .getPublicUrl(fileName);

    // Save to gallery table
    const { error: dbError } = await supabase
      .from('gallery')
      .insert([{
        title,
        description,
        category,
        image_url: publicUrl,
        date,
        location,
      }]);

    if (dbError) throw dbError;

    return NextResponse.json({ success: true, message: 'Gallery item added successfully' });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}