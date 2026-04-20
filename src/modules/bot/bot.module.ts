import { Module } from '@nestjs/common';
import { BotUpdate } from './bot.update';
import { RegistrationWizard } from './wizards/registartion.wizard';

@Module({
    providers: [
        BotUpdate,
        RegistrationWizard
    ],
})
export class BotModule { }