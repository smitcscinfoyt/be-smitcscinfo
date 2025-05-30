import { Injectable } from '@nestjs/common';
import { TranslationService } from 'src/common/services/translation.service';
import { I18nKeys } from 'src/i18n/i18n-keys';
import { Role } from './enitities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesService {
  constructor(
    private readonly translationService: TranslationService,
    @InjectRepository(Role)
    private readonly RoleRepo: Repository,
  ) {}
  async createRole(name: string) {
    if (!name || name.trim() === '') {
      throw new Error(
        await this.translationService.t(I18nKeys.ROLES.EMPTY_NAME),
      );
    }

    const role = new Role();
    const newROle = await this.RoleRepo.c

    return name;
  }
}
