import { ModuleMetadata } from '@nestjs/common/interfaces';
import { IConnectionOptions } from './connection-ftp.interface';

export interface IFtpConnectionOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (
    ...args: any[]
  ) => Promise<IConnectionOptions> | IConnectionOptions;
  inject?: any[];
}
