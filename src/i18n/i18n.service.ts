import { I18nKey, kk } from './locales/kk';
import { ru } from './locales/ru';
import { en } from './locales/en';

const locales = {
    kk,
    ru,
    en,
};

export type Lang = keyof typeof locales;

export class I18nService {
    t(lang: Lang, key: I18nKey) {
        const dict = locales[lang] ?? locales.kk;

        return key.split('.').reduce((acc: any, k) => acc?.[k], dict) ?? key;
    }
}
