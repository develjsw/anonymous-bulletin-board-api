import { AlertMeta } from '../type/alert-meta.type';

export interface KeywordAlertServiceInterface {
    sendAlertForText(text: string, meta: AlertMeta): Promise<void>;
}
