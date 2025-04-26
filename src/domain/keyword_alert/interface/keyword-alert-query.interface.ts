import { KeywordAlertEntity } from '../entity/keyword-alert.entity';

export interface KeywordAlertQueryInterface {
    findKeywordAlerts(): Promise<KeywordAlertEntity[]>;
}
