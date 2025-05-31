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
    const role = await this.rolesService.createRole(name);
    return {
      statusCode: HttpStatus.CREATED,
      status: HttpStatus[HttpStatus.CREATED].toLowerCase(),
      message: this.translationService.t(I18nKeys.ROLES.CREATED_SUCCESS),
      timestamp: new Date().toISOString(),
      data: role,
    };
  }
}
