import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SerializeInterceptor } from './shared/interceptor/serialize-interceptor';
import { ResponseFormatInterceptor } from './shared/interceptor/response-format.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true
        })
    );

    app.useGlobalInterceptors(new SerializeInterceptor(), new ResponseFormatInterceptor());

    const configService: ConfigService = app.get(ConfigService);

    await app.listen(+configService.get('PORT'));
}
bootstrap();
