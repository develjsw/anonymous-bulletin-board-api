import { Module } from '@nestjs/common';
import { KeywordAlertService } from './service/keyword-alert.service';
import { GetKeywordAlertQuery } from './repository/query/get-keyword-alert.query';
import { PrismaModule } from '../../shared/prisma/prisma.module';
import { KEYWORD_ALERT_SERVICE } from './constant/keyword-alert.constant';

@Module({
    imports: [PrismaModule],
    controllers: [],
    providers: [
        GetKeywordAlertQuery,
        {
            provide: KEYWORD_ALERT_SERVICE,
            useClass: KeywordAlertService
        }
    ],
    exports: [GetKeywordAlertQuery, KEYWORD_ALERT_SERVICE]
})
export class KeywordAlertModule {}
