import { registerAs } from '@nestjs/config';
import { IAppConfig } from './interfaces/app-config.interface';

export const AppConfig = registerAs<IAppConfig>('app', () => {
  return {
    port: parseInt(process.env.APP_PORT) || 4001,
    appName: 'NestJS',
  };
});

export default AppConfig;
