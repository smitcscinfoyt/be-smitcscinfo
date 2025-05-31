import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { TranslationService } from 'src/common/services/translation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './enitities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RolesController],
  providers: [RolesService, TranslationService],
})
export class RolesModule {}
