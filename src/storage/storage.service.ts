import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import * as path from 'path';
import { STORAGE_UPLOAD_PATH } from 'src/constants/config';

@Injectable()
export class StorageService {
    constructor() { }

    async uploadFile(file: Express.Multer.File, dir: string): Promise<string> {
        if (!file) throw new BadRequestException("Файл не предоставлен");

        const targetDir = this.ensureDir(dir);
        const filename = this.generateFilename(file.originalname);
        const filepath = path.join(targetDir, filename);

        try {
            writeFileSync(filepath, file.buffer);
            return path.join(dir, filename);
        } catch (error) {
            throw new BadRequestException("Ошибка при записи файла на диск");
        }
    }

    getFile(filename: string, dir: string, res: any) {
        const fullPath = path.join(STORAGE_UPLOAD_PATH, dir, filename);
        if (!existsSync(fullPath)) throw new NotFoundException("Файл не найден на сервере");

        const response = res.sendFile(filename, { root: `${STORAGE_UPLOAD_PATH}${dir}` });
        return {
            status: HttpStatus.OK,
            data: response,
        };
    }

    private ensureDir(dir: string): string {
        const targetDir = path.join(STORAGE_UPLOAD_PATH, dir);
        if (!existsSync(targetDir)) {
            mkdirSync(targetDir, { recursive: true });
        }
        return targetDir;
    }

    private generateFilename(originalName: string): string {
        const ext = path.extname(originalName).toLowerCase();
        const uuid = crypto.randomUUID();
        return `${uuid}${ext}`;
    }
}
