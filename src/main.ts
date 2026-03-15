import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { SentryFilter } from './common/sentry.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ⭐ Enable CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // ⭐ Global API prefix
  app.setGlobalPrefix('api');

  // security middleware
  app.use(helmet());
  app.use(cookieParser());

  // global error handler
  app.useGlobalFilters(new SentryFilter());

  // ⭐ Use Railway's PORT and bind to 0.0.0.0
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();