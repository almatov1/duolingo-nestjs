import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { I18nService } from "nestjs-i18n";
import { LEVELS } from "src/constants/curriculum";
import { Markup, Scenes } from "telegraf";

@Injectable()
export class MenuService {
    constructor(
        private readonly i18n: I18nService
    ) { }

    async showMainMenu(ctx: Scenes.WizardContext | Scenes.SceneContext) {
        const user = (ctx.session as any).user as User;

        const buttons = LEVELS.find(l => l.label === user.level)?.topics.map(topic => ([
            Markup.button.callback(`📖 ${this.i18n.t(`topics.${topic.id}`, { lang: user.language })}`, `view_lesson:${topic.id}`)
        ])) ?? [];
        await ctx.reply(this.i18n.t('topics.start', { lang: user.language }), Markup.inlineKeyboard(buttons));
    }
}
