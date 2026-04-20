import { Context, Start, Update } from 'nestjs-telegraf';
import { Scenes } from 'telegraf';

@Update()
export class BotUpdate {

    @Start()
    async onStart(@Context() ctx: Scenes.SceneContext) {
        await ctx.scene.enter('registration-wizard');
    }
}
