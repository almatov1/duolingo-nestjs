import { Module } from '@nestjs/common';
import { BotUpdate } from './bot.update';
import { RegistrationWizard } from './wizards/registartion.wizard';
import { TestWizard } from './wizards/test.wizard';
import { FormatWizard } from './wizards/format.wizard';
import { MenuService } from './menu.service';

@Module({
    providers: [
        BotUpdate,
        RegistrationWizard,
        TestWizard,
        FormatWizard,
        MenuService
    ]
})
export class BotModule { }