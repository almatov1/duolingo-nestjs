import { Wizard, WizardStep, Context, Message, On } from 'nestjs-telegraf';
import { Scenes } from 'telegraf';
import { RegistrationInterface } from '../interfaces/registration.interface';
import { I18nService } from 'nestjs-i18n';

@Wizard('registration-wizard')
export class RegistrationWizard {
    constructor(
        private readonly i18n: I18nService
    ) { }

    @WizardStep(1)
    async step1(@Context() ctx: Scenes.WizardContext) {
        await ctx.reply('Ақтөбе облысының Тілдерді дамыту басқармасы ММ-нің «Тілдерді оқыту орталығы» КММ әзірлеген тіл үйрену ботына қош келдіңіз!\n\nҚызметті бастау үшін өзіңізге ыңғайлы тілді таңдаңыз:', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '🇰🇿 Қазақ тілі', callback_data: 'kk' },
                        { text: '🇷🇺 Русский язык', callback_data: 'ru' },
                        { text: '🇺🇸 English', callback_data: 'en' }
                    ]
                ],
            },
        });
        ctx.wizard.next();
    }

    @On('callback_query')
    @WizardStep(2)
    async step2(@Context() ctx: Scenes.WizardContext & { update: any }) {
        const state = ctx.wizard.state as RegistrationInterface;
        state.language = ctx.update.callback_query.data ?? 'kk';
        await ctx.answerCbQuery();
        await ctx.reply(this.i18n.t('registration.ask_name', { lang: state.language }));
        ctx.wizard.next();
    }

    @On('text')
    @WizardStep(3)
    async step3(@Context() ctx: Scenes.WizardContext) {
        (ctx.wizard.state as RegistrationInterface).name = (ctx.message as any).text;
        await ctx.reply(this.i18n.t('registration.ask_birthday', { lang: (ctx.wizard.state as RegistrationInterface).language }));
        ctx.wizard.next();
    }

    @On('text')
    @WizardStep(4)
    async step4(@Context() ctx: Scenes.WizardContext) {
        (ctx.wizard.state as RegistrationInterface).birthday = (ctx.message as any).text;
        await ctx.reply(this.i18n.t('registration.ask_nationalty', { lang: (ctx.wizard.state as RegistrationInterface).language }));
        ctx.wizard.next();
    }

    @On('text')
    @WizardStep(5)
    async step5(@Context() ctx: Scenes.WizardContext) {
        (ctx.wizard.state as RegistrationInterface).nationality = (ctx.message as any).text;
        await ctx.reply(this.i18n.t('registration.ask_workspace', { lang: (ctx.wizard.state as RegistrationInterface).language }));
        ctx.wizard.next();
    }

    @On('text')
    @WizardStep(6)
    async step6(@Context() ctx: Scenes.WizardContext) {
        (ctx.wizard.state as RegistrationInterface).workplace = (ctx.message as any).text;
        await ctx.reply(this.i18n.t('registration.ask_address', { lang: (ctx.wizard.state as RegistrationInterface).language }));
        ctx.wizard.next();
    }

    @On('text')
    @WizardStep(7)
    async step7(@Context() ctx: Scenes.WizardContext) {
        (ctx.wizard.state as RegistrationInterface).address = (ctx.message as any).text;
        await ctx.reply(this.i18n.t('registration.ask_telephone', { lang: (ctx.wizard.state as RegistrationInterface).language }));
        ctx.wizard.next();
    }

    @On('text')
    @WizardStep(8)
    async step8(@Context() ctx: Scenes.WizardContext) {
        const state = ctx.wizard.state as RegistrationInterface;
        state.phone = (ctx.message as any).text;
        console.log('Данные регистрации:', state);
        await ctx.reply(`Регистрация завершена!\n\nHello, ${state.name}!`);
        return ctx.scene.leave();
    }
}
