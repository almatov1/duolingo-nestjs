export const kk = {
    registration: {
        ask_name: 'Атыңызды енгізіңіз:',
        ask_birthday: 'Туған күніңізді енгізіңіз:',
    },
    test: {
        start: 'Қысқа тест басталады',
    },
} as const;

export type I18nSchema = typeof kk;

type Join<K, P> =
    K extends string | number
    ? P extends string | number
    ? `${K}.${P}`
    : never
    : never;

type Paths<T> = {
    [K in keyof T]: T[K] extends object
    ? K | Join<K, Paths<T[K]>>
    : K
}[keyof T];

export type I18nKey = Paths<I18nSchema>;
