import { Controller, HttpStatus, Post, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { TranslationService } from 'src/common/services/translation.service';
import { I18nKeys } from '../../common/i18n/i18n-keys';

@Controller('roles')
export class RolesController {
  constructor(
    private readonly rolesService: RolesService,
    private readonly translationService: TranslationService,
  ) {}
  @Post()
  async createRole(@Query('name') name: string) {
    if (!name || name.trim() === '') {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        status: HttpStatus[HttpStatus.OK].toLowerCase(),
        message: await this.translationService.t(I18nKeys.ROLES.EMPTY_NAME),
        timestamp: new Date().toISOString(),
        data: [],
      };
    }
    return this.rolesService.createRole(name);
  }
}
