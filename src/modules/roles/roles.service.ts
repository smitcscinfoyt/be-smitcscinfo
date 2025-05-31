import { Injectable } from '@nestjs/common';
import { TranslationService } from 'src/common/services/translation.service';
import { I18nKeys } from '../../common/i18n/i18n-keys';
import { Role } from './enitities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    private readonly translationService: TranslationService,
    @InjectRepository(Role)
    private readonly RoleRepo: Repository<Role>,
  ) {}
  async createRole(name: string) {
    if (!name || name.trim() === '') {
      throw new Error(
        await this.translationService.t(I18nKeys.ROLES.EMPTY_NAME),
      );
    }

    return name;
  }
}
