import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './domain/post/post.module';
import { CommentModule } from './domain/comment/comment.module';
import { KeywordAlertModule } from './domain/keyword-alert/keyword-alert.module';

let envFile = 'env.local';
switch (process.env.NODE_ENV) {
    case 'production':
        envFile = 'env.production';
        break;
    case 'development':
        envFile = 'env.development';
        break;
}

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [path.resolve(__dirname, `../${envFile}`)],
            isGlobal: true,
            cache: true
        }),
        PostModule,
        CommentModule,
        KeywordAlertModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
