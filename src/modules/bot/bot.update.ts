import { Update, Start, Ctx, On } from '@grammyjs/nestjs';
import { Language } from '@prisma/client';
import { Context, InlineKeyboard } from 'grammy';
import { I18nService } from 'src/i18n/i18n.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Update()
export class BotUpdate {
    constructor(
        private readonly prisma: PrismaService,
        private readonly i18n: I18nService
    ) { }

    private getLanguageKeyboard() {
        return new InlineKeyboard()
            .text('Қазақ тілі 🇰🇿', 'set_lang_kk')
            .text('Русский язык 🇷🇺', 'set_lang_ru')
            .text('English 🇬🇧', 'set_lang_en');
    }

    @Start()
    async onStart(@Ctx() ctx: Context) {
        const user = (ctx as any).dbUser;

        if (!user) {
            // Совсем новый пользователь, которого еще нет в базе
            await ctx.reply('Сәлем! Выберите язык / Выберите язык:', {
                reply_markup: this.getLanguageKeyboard(),
            });
        } else {
            const askName = this.i18n.t((ctx as any).lang, 'registration.ask_name');
            await ctx.reply(`Welcome back! Это ваше меню (Язык: ${user.language}) (${askName})`);
        }
    }

    @On('callback_query:data')
    async onLanguageCallback(@Ctx() ctx: Context) {
        const data = ctx.callbackQuery?.data;
        if (!data?.startsWith('set_lang_')) return;

        const langCode = data.replace('set_lang_', '') as Language;
        const telegramId = BigInt(ctx.from!.id);

        // Сохраняем в базу (upsert - создаст если нет, обновит если есть)
        await this.prisma.user.upsert({
            where: { telegramId },
            update: { language: langCode },
            create: { telegramId, language: langCode },
        });

        await ctx.answerCallbackQuery();
        await ctx.editMessageText(`✅ Язык установлен. Переходим в меню...`);

        // Показываем меню сразу после выбора языка
        await ctx.reply('🏠 ГЛАВНОЕ МЕНЮ');
    }

    // Обработка ВСЕХ остальных сообщений (тот самый "неожиданный сценарий")
    @On('message')
    async onAnyMessage(@Ctx() ctx: Context) {
        const user = (ctx as any).dbUser;

        if (!user) {
            // Если пользователя нет в базе и он прислал не /start, а что-то другое
            return await ctx.reply('Пожалуйста, начните с команды /start для регистрации.');
        }

        // Если пользователь есть, но прислал что-то, чего мы не ждем
        await ctx.reply('Я вас не понимаю. Воспользуйтесь меню или командой /start.');
    }
}
