import { Injectable } from '@nestjs/common';
import { GetKeywordAlertQuery } from '../repository/query/get-keyword-alert.query';
import { KeywordAlertEntity } from '../entity/keyword-alert.entity';
import { KeywordAlertServiceInterface } from '../interface/keyword-alert-service.interface';
import { AlertMeta } from '../type/alert-meta.type';

@Injectable()
export class KeywordAlertService implements KeywordAlertServiceInterface {
    constructor(private readonly getKeywordAlertQuery: GetKeywordAlertQuery) {}

    async sendAlertForText(text: string, meta: AlertMeta): Promise<void> {
        const findKeywordAlertsResult: KeywordAlertEntity[] = await this.getKeywordAlertQuery.findKeywordAlerts();

        for (const { writer, keyword } of findKeywordAlertsResult) {
            if (text.includes(keyword)) {
                console.log({
                    writer,
                    keyword,
                    ...meta
                });

                // TODO : 알림 호출 메서드 추가 필요
                // await this.notificationService.notifyKeywordAlert({
                //     writer,
                //     keyword,
                //     ...meta,
                // });
            }
        }
    }
}
