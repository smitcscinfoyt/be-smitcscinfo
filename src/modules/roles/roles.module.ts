import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { TranslationService } from 'src/common/services/translation.service';

@Module({
  controllers: [RolesController],
  providers: [RolesService, TranslationService],
})
export class RolesModule {}
