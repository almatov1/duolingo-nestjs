import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { TelegrafExecutionContext } from "nestjs-telegraf";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class BotGuard implements CanActivate {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = TelegrafExecutionContext.create(context).getContext<any>();
        const userId = ctx.from?.id;

        if (userId) {
            const user = await this.prisma.user.findUnique({
                where: { telegramId: BigInt(userId) }
            });
            ctx.state.user = user;
        }
        return true;
    }
}
