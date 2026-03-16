import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { SentryFilter } from './common/sentry.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ⭐ Enable CORS for all origins
  app.enableCors({
    origin: "*",
  });

  // ⭐ Global API prefix
  app.setGlobalPrefix('api');

  // security middleware
  app.use(helmet());
  app.use(cookieParser());

  // global error handler
  app.useGlobalFilters(new SentryFilter());

  // ⭐ Use Railway PORT
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();