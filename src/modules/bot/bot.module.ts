import { Module } from '@nestjs/common';
import { BotUpdate } from './bot.update';
import { NestjsGrammyModule } from '@grammyjs/nestjs';
import { BotMiddleware } from 'src/middlewares/bot.middleware';
import { MiddlewareModule } from 'src/middlewares/middleware.module';
import { I18nModule } from 'src/i18n/i18n.module';

@Module({
    imports: [
        MiddlewareModule,
        NestjsGrammyModule.forRootAsync({
            imports: [MiddlewareModule],
            inject: [BotMiddleware],
            useFactory: (botMiddleware: BotMiddleware) => ({
                token: process.env.TELEGRAM_TOKEN!,
                middlewares: [botMiddleware.use]
            }),
        }),
        I18nModule
    ],
    providers: [BotUpdate],
})
export class BotModule { }
