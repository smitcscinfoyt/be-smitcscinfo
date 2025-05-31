import { HttpStatus, Injectable } from '@nestjs/common';
import { TranslationService } from './common/services/translation.service';
import { I18nKeys } from './common/i18n/i18n-keys';
import { ApiResponseDto } from './common/dto/api-response.dto';

@Injectable()
export class AppService {
  constructor(private readonly translationService: TranslationService) {}
  async healthCheck(): Promise<ApiResponseDto> {
    return {
      statusCode: HttpStatus.OK,
      status: HttpStatus[HttpStatus.OK].toLowerCase(),
      message: await this.translationService.t(I18nKeys.COMMON.HEALTH),
      timestamp: new Date().toISOString(),
      data: [],
    };
  }
}
