import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { IAppConfig } from './config/interfaces/app-config.interface';
import { ITestConfig } from './config/interfaces/test-config.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const appConfig = configService.get<IAppConfig>('app');

  const testConfig = configService.get<ITestConfig>('test');

  // swagger
  const config = new DocumentBuilder()
    .setTitle('NestJS example')
    .setDescription('Nest JS example API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-swagger', app, document);

  await app.listen(appConfig.port);
  console.log(`server running on port: ${appConfig.port}`);
  console.log(`app name is: ${appConfig.appName}`);

  console.log(`config test is: ${testConfig.version}`);
}
bootstrap();
