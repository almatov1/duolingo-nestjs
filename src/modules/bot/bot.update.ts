import { Context, Start, Update } from 'nestjs-telegraf';
import { MenuService } from './menu.service';
import { I18nService } from 'nestjs-i18n';
import { StudyFormat, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Scenes } from 'telegraf';
@Update()
export class BotUpdate {
    constructor(
        private readonly menuService: MenuService,
        private readonly i18n: I18nService,
        private readonly prisma: PrismaService
    ) { }

    @Start()
    async onStart(@Context() ctx: Scenes.SceneContext & {
        session: {
            user?: User | null;
        };
    }) {
        const telegramId = ctx.from?.id;
        if (telegramId) {
            if (!ctx.session.user) {
                const user = await this.prisma.user.findUnique({
                    where: { telegramId: BigInt(telegramId) },
                });
                ctx.session.user = user ?? null;
            }
        }

        if (!ctx.session.user) return ctx.scene.enter('registration-wizard');
        if (!ctx.session.user.level) return ctx.scene.enter('test-wizard');
        if (!ctx.session.user.format) return ctx.scene.enter('format-wizard');
        if (ctx.session.user.format === StudyFormat.OFFLINE) {
            await ctx.reply(this.i18n.t('format.location', { lang: ctx.session.user.language }));
            return;
        }

        await this.menuService.showMainMenu(ctx);
        return;
    }
}
