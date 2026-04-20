import { Injectable } from "@nestjs/common";
import { I18nService } from "nestjs-i18n";
import { Markup } from "telegraf";

@Injectable()
export class MenuService {
    constructor(
        private readonly i18n: I18nService
    ) { }

    async showMainMenu(ctx: any) {
        const lang = ctx.state.user?.language || 'kk';
        await ctx.reply(this.i18n.t('menu.welcome', { lang }),
            Markup.keyboard([
                [this.i18n.t('menu.lessons', { lang }), this.i18n.t('menu.profile', { lang })],
                [this.i18n.t('menu.support', { lang })]
            ]).resize()
        );
    }
}
