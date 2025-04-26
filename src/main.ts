import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SerializeInterceptor } from './shared/interceptor/serialize-interceptor';
import { ResponseFormatInterceptor } from './shared/interceptor/response-format.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

    const config = new DocumentBuilder()
        .setTitle('익명 게시판 API')
        .setDescription('댓글 및 키워드 알림 기능이 포함된 익명 게시판 서비스입니다.')
        .setVersion('1.0.0')
        .addServer(`http://localhost:${configService.get('PORT')}`)
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);

    await app.listen(+configService.get('PORT'));
}
bootstrap();
