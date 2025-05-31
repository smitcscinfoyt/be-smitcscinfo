import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TranslationService } from 'src/common/services/translation.service';
import { I18nKeys } from '../../common/i18n/i18n-keys';
import { DataSource } from 'typeorm';
import { Role } from './enitities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    private readonly translationService: TranslationService,
    private readonly dataSource: DataSource,
  ) {}
  async createRole(name: string) {
    if (!name || name.trim() === '') {
      throw new HttpException(
        await this.translationService.t(I18nKeys.ROLES.EMPTY_NAME),
        HttpStatus.BAD_REQUEST,
      );
    }

    const result: Role[] = await this.dataSource.query(
      `INSERT INTO roles (name)
      VALUES ($1)
      ON CONFLICT (name) DO NOTHING
      RETURNING *`,
      [name],
    );

    if (!result || result.length === 0) {
      throw new HttpException(
        await this.translationService.t(I18nKeys.ROLES.DUPLICATE_NAME),
        HttpStatus.BAD_REQUEST,
      );
    }

    return result[0];
  }
}
