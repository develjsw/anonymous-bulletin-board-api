import { Injectable } from '@nestjs/common';
import { PrismaMasterClientService } from '../../../../shared/prisma/service/prisma-master-client.service';
import { KeywordAlertQueryInterface } from '../../interface/keyword-alert-query.interface';
import { KeywordAlertEntity } from '../../entity/keyword-alert.entity';

@Injectable()
export class GetKeywordAlertQuery implements KeywordAlertQueryInterface {
    constructor(private readonly prismaMasterClientService: PrismaMasterClientService) {}

    async findKeywordAlerts(): Promise<KeywordAlertEntity[]> {
        return this.prismaMasterClientService.keyword_alerts.findMany();
    }
}
