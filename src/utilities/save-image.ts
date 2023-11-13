import { Injectable } from '@nestjs/common';
import { UploadImageDto } from 'src/core/infra';
import { Client } from 'basic-ftp';
import { Readable } from 'stream';

@Injectable()
export class FtpService {
  private client = new Client();

  constructor() {}

  async connect() {
    try {
      await this.client.access({
        host: process.env.FTP_HOST,
        user: process.env.FTP_USER,
        password: process.env.FTP_PASS,
        secure: false,
      });
      console.log('Connected to FTP server');
    } catch (error) {
      console.error('Error connecting to FTP server:', error);
    }
  }

  async disconnect() {
    try {
      await this.client.close();
      console.log('Disconnected from FTP server');
    } catch (error) {
      console.error('Error disconnecting from FTP server:', error);
    }
  }

  async saveImage(file: UploadImageDto, folder: string, name: string) {
    const path = `/api/images/${folder.replace(/\D/g, '').toLowerCase()}`;
    try {
      await this.connect();

      await this.client.ensureDir(path);
      const stream = new Readable();

      stream.push(file.buffer);
      stream.push(null);

      const fullName = `${path}/${name}.${file.originalname.split('.')[1]}`;

      await this.client.uploadFrom(stream, fullName);
      await this.disconnect();

      return `https://api.salvae.com.br/images/${folder}/${file.originalname}`;
    } catch (error) {
      throw new Error(error);
    } finally {
      await this.disconnect();
    }
  }
}
