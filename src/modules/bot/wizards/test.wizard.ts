import { I18nService } from 'nestjs-i18n';
import { Wizard, WizardStep, Context, On } from 'nestjs-telegraf';
import { TEST_QUESTIONS, TEST_RESULT } from 'src/constants/test';
import { PrismaService } from 'src/prisma/prisma.service';
import { Scenes, Markup } from 'telegraf';

@Wizard('test-wizard')
export class TestWizard {
    constructor(
        private readonly prisma: PrismaService,
        private readonly i18n: I18nService
    ) { }

    @WizardStep(1)
    async startTest(@Context() ctx: Scenes.WizardContext) {
        const state = ctx.wizard.state as any;
        state.lang = ctx.state.user?.language || 'kk';
        state.currentIdx = 0;
        state.score = 0;

        await ctx.reply(this.i18n.t('test.start', { lang: state.lang }));

        const msg = await this.sendQuestion(ctx, true) as any;
        state.messageId = msg.message_id;

        ctx.wizard.next();
    }

    @On('callback_query')
    @WizardStep(2)
    async handleAnswer(@Context() ctx: Scenes.WizardContext & { update: any }) {
        const state = ctx.wizard.state as any;
        const callbackData = ctx.update.callback_query.data;

        const [questionIdx, answerIdx] = callbackData.split('-').map(Number);
        if (questionIdx !== state.currentIdx) return await ctx.answerCbQuery();

        const currentQuestion = TEST_QUESTIONS[state.currentIdx];
        if (answerIdx === currentQuestion.correctIndex) state.score++;

        await ctx.editMessageText('⏳');

        await ctx.answerCbQuery();
        state.currentIdx++;

        if (state.currentIdx < TEST_QUESTIONS.length) await this.sendQuestion(ctx, false)
        else {
            ctx.telegram.deleteMessage(ctx.chat!.id, state.messageId);

            const resultLevel = TEST_RESULT.findLast(t => t.correctCount <= state.score);
            const levelKey = resultLevel?.level!;
            const levelName = this.i18n.t(`test.${levelKey}`, { lang: state.lang });

            await ctx.reply(this.i18n.t('test.result', {
                lang: state.lang,
                args: { level: levelKey, levelName: levelName }
            }));

            this.prisma.user.update({
                where: { telegramId: BigInt(ctx.from!.id) },
                data: { level: levelKey }
            });

            return ctx.scene.enter('format-wizard');
        }
    }

    private async sendQuestion(ctx: Scenes.WizardContext, isFirst: boolean) {
        const state = ctx.wizard.state as any;
        const q = TEST_QUESTIONS[state.currentIdx];

        const text = `${state.currentIdx + 1}. ${q.question}`;
        const keyboard = Markup.inlineKeyboard(
            q.answers.map((ans, index) => Markup.button.callback(ans, `${state.currentIdx}-${index}`)),
            { columns: 1 }
        );

        if (isFirst) return await ctx.reply(text, keyboard);
        else {
            return await ctx.telegram.editMessageText(
                ctx.chat!.id,
                state.messageId,
                undefined,
                text,
                keyboard
            );
        }
    }
}
