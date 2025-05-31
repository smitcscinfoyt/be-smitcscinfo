import { IsOptional, IsString, IsIn, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetRolesQueryDto {
  @ApiPropertyOptional({ example: 'admin' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: '3517f83d-26af-4d26-a147-26cd3cb36c69' })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiPropertyOptional({ enum: ['name', 'updatedAt'], example: 'name' })
  @IsOptional()
  @IsIn(['name', 'updatedAt'])
  sortBy?: 'name' | 'updatedAt';

  @ApiPropertyOptional({ enum: ['asc', 'desc'], example: 'desc' })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;
}
