import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { TranslationService } from 'src/common/services/translation.service';
import { I18nKeys } from '../../common/i18n/i18n-keys';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { GetRolesQueryDto } from './dto/get-roles-query.dto';
import { ApiHeader, ApiOperation } from '@nestjs/swagger';
import { SupportedLanguages } from 'src/common/enums/language.enum';

@Controller('roles')
export class RolesController {
  constructor(
    private readonly rolesService: RolesService,
    private readonly translationService: TranslationService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new role' })
  @ApiHeader({
    name: 'x-lang',
    description: 'Language for the response',
    required: false,
    schema: {
      type: 'string',
      enum: SupportedLanguages,
    },
  })
  async createRole(@Query('name') name: string): Promise<ApiResponseDto> {
    const role = await this.rolesService.createRole(name);
    return {
      statusCode: HttpStatus.CREATED,
      status: HttpStatus[HttpStatus.CREATED].toLowerCase(),
      message: await this.translationService.t(I18nKeys.ROLES.CREATED_SUCCESS),
      timestamp: new Date().toISOString(),
      data: role,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all roles' })
  @ApiHeader({
    name: 'x-lang',
    description: 'Language for the response',
    required: false,
    schema: {
      type: 'string',
      enum: SupportedLanguages,
    },
  })
  async getRoles(@Query() query: GetRolesQueryDto): Promise<ApiResponseDto> {
    const result = await this.rolesService.getRoles(query);
    return {
      statusCode: HttpStatus.OK,
      status: HttpStatus[HttpStatus.OK].toLowerCase(),
      message: await this.translationService.t(I18nKeys.ROLES.FETCH_SUCCESS),
      timestamp: new Date().toISOString(),
      data: result,
    };
  }
}
