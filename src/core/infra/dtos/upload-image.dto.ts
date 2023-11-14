export type UploadImageDto = {
  filename: string;
  originalname: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
};
