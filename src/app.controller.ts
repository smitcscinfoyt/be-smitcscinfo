import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiResponseDto } from './common/dto/api-response.dto';
import { SupportedLanguages } from './common/enums/language.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health-check')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Health Check Endpoint' })
  @ApiResponse({
    status: 200,
    description: 'Health check successful',
    type: ApiResponseDto,
  })
  @ApiHeader({
    name: 'x-lang',
    description: 'Language for the response',
    required: false,
    schema: {
      type: 'string',
      enum: SupportedLanguages,
    },
  })
  async healthCheck(): Promise<ApiResponseDto> {
    return await this.appService.healthCheck();
  }
}
