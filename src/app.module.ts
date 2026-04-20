import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { StorageModule } from './storage/storage.module';
import { BotModule } from './modules/bot/bot.module';
import { ConfigModule } from '@nestjs/config';
import { I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import { TelegrafModule } from 'nestjs-telegraf';
import { session } from 'telegraf';
import { TelegrafI18nModule } from 'nestjs-telegraf-i18n';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    StorageModule,
    I18nModule.forRoot({
      fallbackLanguage: 'kk',
      loaderOptions: {
        path: path.join(__dirname, 'locales/'),
        watch: true
      },
      resolvers: []
    }),
    TelegrafI18nModule,
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_TOKEN!,
      middlewares: [session()]
    }),
    BotModule
  ]
})
export class AppModule { }
