import { Injectable } from '@nestjs/common';
import { PrismaMasterClientService } from '../../../../shared/prisma/service/prisma-master-client.service';
import { keyword_alerts as KeywordAlertModel } from '../../../../../prisma/generated/master-client';

@Injectable()
export class GetKeywordAlertQuery {
    constructor(private readonly prismaMasterClientService: PrismaMasterClientService) {}

    async findKeywordAlerts(): Promise<KeywordAlertModel[]> {
        return this.prismaMasterClientService.keyword_alerts.findMany();
    }
}
