import { Module } from '@nestjs/common';
import { BotMiddleware } from './bot.middleware.js';

@Module({
    providers: [BotMiddleware],
    exports: [BotMiddleware],
})
export class MiddlewareModule { }
