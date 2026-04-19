import { Injectable } from '@nestjs/common';
import { Context, NextFunction } from 'grammy';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BotMiddleware {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    use = async (ctx: Context, next: NextFunction) => {
        if (!ctx.from || ctx.from.is_bot) return next();
        const telegramId = BigInt(ctx.from.id);

        let user = await this.prisma.user.findUnique({
            where: { telegramId },
        });
        (ctx as any).dbUser = user;
        (ctx as any).lang = user?.language ?? 'kk';

        return next();
    }
}
