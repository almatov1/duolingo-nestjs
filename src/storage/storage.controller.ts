import { Controller, Get, Param, Res } from '@nestjs/common';
import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
    constructor(
        private readonly storage: StorageService
    ) { }

    @Get(':dir/:filename')
    getImage(
        @Param('dir') dir: string,
        @Param('filename') filename: string,
        @Res() res
    ) {
        return this.storage.getFile(filename, dir, res);
    }
}
