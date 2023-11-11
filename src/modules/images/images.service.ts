import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { UploadImageDto } from 'src/core/infra';

@Injectable()
export class ImagesService {
  constructor() {}

  async upload(file: UploadImageDto): Promise<string> {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
      {
        auth: {
          persistSession: false,
        },
      },
    );

    const result = await supabase.storage
      .from('images')
      .upload(file.originalname, file.buffer, {
        upsert: true,
      });
    console.log('ImagesService : upload : result:', result);

    return 'ok';
  }
}
