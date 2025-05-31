import { Injectable } from '@nestjs/common';
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
      throw new Error(
        await this.translationService.t(I18nKeys.ROLES.EMPTY_NAME),
      );
    }

    const role: Role = await this.dataSource.query(
      `INSERT INTO role (name)
      values ($1)
      ON CONFLICT (name) DO NOTHING
      RETURN *`,
      [name],
    );

    if (!role) {
      throw new Error(
        await this.translationService.t(I18nKeys.ROLES.DUPLICATE_NAME),
      );
    }

    return role;
  }
}
