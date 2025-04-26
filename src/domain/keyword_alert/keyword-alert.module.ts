import { Module } from '@nestjs/common';
import { KeywordAlertController } from './controller/keyword-alert.controller';
import { KeywordAlertService } from './service/keyword-alert.service';
import { GetKeywordAlertQuery } from './repository/query/get-keyword-alert.query';
import { PrismaModule } from '../../shared/prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [KeywordAlertController],
    providers: [KeywordAlertService, GetKeywordAlertQuery],
    exports: [GetKeywordAlertQuery]
})
export class KeywordAlertModule {}
