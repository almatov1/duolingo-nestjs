import { UseGuards } from '@nestjs/common';
import { Context, Start, Update } from 'nestjs-telegraf';
import { BotGuard } from 'src/guards/bot.guard';
import { Scenes } from 'telegraf';
import { MenuService } from './menu.service';

@Update()
@UseGuards(BotGuard)
export class BotUpdate {
    constructor(
        private readonly menuService: MenuService
    ) { }

    @Start()
    async onStart(@Context() ctx: Scenes.SceneContext) {
        const user = ctx.state.user;

        if (!user) return ctx.scene.enter('registration-wizard');
        if (!user.level) return ctx.scene.enter('test-wizard');
        if (!user.format) return ctx.scene.enter('format-wizard');
        return this.menuService.showMainMenu(ctx);
    }
}
