import { Injectable } from '@nestjs/common';
import { GetKeywordAlertQuery } from '../repository/query/get-keyword-alert.query';
import { keyword_alerts as KeywordAlertModel } from '../../../../prisma/generated/master-client';

interface AlertMeta {
    type: 'post' | 'comment';
    id: number;
}

@Injectable()
export class KeywordAlertService {
    constructor(private readonly getKeywordAlertQuery: GetKeywordAlertQuery) {}

    async sendAlertForText(text: string, meta: AlertMeta): Promise<void> {
        const findKeywordAlertsResult: KeywordAlertModel[] = await this.getKeywordAlertQuery.findKeywordAlerts();

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
