import { StudyFormat, User } from '@prisma/client';
import { I18nService } from 'nestjs-i18n';
import { Wizard, WizardStep, Context, On } from 'nestjs-telegraf';
import { PrismaService } from 'src/prisma/prisma.service';
import { Scenes } from 'telegraf';
import { MenuService } from '../menu.service';

@Wizard('format-wizard')
export class FormatWizard {
    constructor(
        private readonly prisma: PrismaService,
        private readonly i18n: I18nService,
        private readonly menuService: MenuService
    ) { }

    @WizardStep(1)
    async step1(@Context() ctx: Scenes.WizardContext) {
        const user = (ctx.session as any).user as User;

        await ctx.reply(this.i18n.t('format.start', { lang: user.language }), {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: this.i18n.t('format.online', { lang: user.language }), callback_data: StudyFormat.ONLINE },
                        { text: this.i18n.t('format.offline', { lang: user.language }), callback_data: StudyFormat.OFFLINE }
                    ]
                ],
            },
        });
        ctx.wizard.next();
    }

    @On('callback_query')
    @WizardStep(2)
    async handleAnswer(@Context() ctx: Scenes.WizardContext & { update: any }) {
        const user = (ctx.session as any).user as User;
        const callbackData = ctx.update.callback_query.data;

        await this.prisma.user.update({
            where: { telegramId: BigInt(ctx.from!.id) },
            data: { format: callbackData }
        });

        await ctx.answerCbQuery();
        if (callbackData === StudyFormat.OFFLINE) await ctx.reply(this.i18n.t('format.location', { lang: user.language }));
        else await this.menuService.showMainMenu(ctx);
        return ctx.scene.leave();
    }
}
