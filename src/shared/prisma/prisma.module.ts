import { Module } from '@nestjs/common';
import { PrismaMasterClientService } from './service/prisma-master-client.service';

@Module({
    providers: [PrismaMasterClientService],
    exports: [PrismaMasterClientService]
})
export class PrismaModule {}
