import { Injectable } from '@nestjs/common';
import { PrismaMasterClientService } from '../../../../shared/prisma/service/prisma-master-client.service';

@Injectable()
export class GetKeywordAlertQuery {
    constructor(private readonly prismaMasterClientService: PrismaMasterClientService) {}
}
