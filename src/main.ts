import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { SentryFilter } from './common/sentry.filter';

async function bootstrap() {
const app = await NestFactory.create(AppModule);

// Enable CORS
app.enableCors({
origin: "*",
});

// Global API prefix
app.setGlobalPrefix('api');

// Security middleware
app.use(helmet());
app.use(cookieParser());

// Global error handler
app.useGlobalFilters(new SentryFilter());

// Dynamic port (required for cloud platforms)
const port = process.env.PORT || 3000;

await app.listen(port, '0.0.0.0');

console.log(`Server running on port ${port}`);
}

bootstrap();
