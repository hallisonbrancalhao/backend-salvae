import * as fs from 'fs';
import { UploadImageDto } from 'src/core/infra';
const path = require('path');

export async function saveImage(userId: string, file: UploadImageDto) {
  const { buffer, originalname } = file;
  const id = userId.replace(/-/g, '');
  const [name, ext] = originalname.split('.');
  const fileNameWithHash = `${name}-${id}.${ext}`;

  fs.mkdirSync(path.resolve(__dirname, '..', 'api', 'images', `${id}`), {
    recursive: true,
  });

  const filePath = path.resolve(
    __dirname,
    '..',
    'api',
    'images',
    `${id}`,
    fileNameWithHash,
  );
  fs.writeFileSync(filePath, buffer);
  return `uploads/${id}/${fileNameWithHash}`;
}
