import { Wizard, WizardStep, Context, On } from 'nestjs-telegraf';
import { Scenes } from 'telegraf';
import { RegistrationInterface } from '../interfaces/registration.interface';
import { I18nService } from 'nestjs-i18n';
import { PrismaService } from 'src/prisma/prisma.service';
import { Language } from '@prisma/client';

@Wizard('registration-wizard')
export class RegistrationWizard {
    constructor(
        private readonly prisma: PrismaService,
        private readonly i18n: I18nService
    ) { }

    @WizardStep(1)
    async step1(@Context() ctx: Scenes.WizardContext) {
        await ctx.reply('👋 Ақтөбе облысының Тілдерді дамыту басқармасы ММ-нің «Тілдерді оқыту орталығы» КММ әзірлеген тіл үйрену ботына қош келдіңіз!\n\nҚызметті бастау үшін өзіңізге ыңғайлы тілді таңдаңыз:', {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '🇰🇿 Қазақ тілі', callback_data: Language.kk },
                        { text: '🇷🇺 Русский язык', callback_data: Language.ru },
                        { text: '🇺🇸 English', callback_data: Language.en }
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
        await ctx.reply(`${this.i18n.t('registration.start', { lang: state.language })}\n\n${this.i18n.t('registration.ask_name', { lang: state.language })}`);
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
        state.telephone = (ctx.message as any).text;
        const createdUser = await this.prisma.user.create({
            data: {
                telegramId: ctx.from?.id!,
                ...state as any
            }
        });
        (ctx as any).state.user = createdUser;
        return ctx.scene.enter('test-wizard');
    }
}
