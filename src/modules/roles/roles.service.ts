import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TranslationService } from 'src/common/services/translation.service';
import { I18nKeys } from '../../common/i18n/i18n-keys';
import { DataSource } from 'typeorm';
import { Role } from './enitities/role.entity';
import { GetRolesQueryDto } from './dto/get-roles-query.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class RolesService {
  constructor(
    private readonly translationService: TranslationService,
    private readonly dataSource: DataSource,
  ) {}

  async createRole(name: string) {
    if (!name || name.trim() === '') {
      throw new HttpException(
        await this.translationService.t(I18nKeys.ROLES.EMPTY_NAME),
        HttpStatus.BAD_REQUEST,
      );
    }

    const result: Role[] = await this.dataSource.query(
      `INSERT INTO roles (name)
      VALUES ($1)
      ON CONFLICT (name) DO NOTHING
      RETURNING *`,
      [name],
    );

    if (!result || result.length === 0) {
      throw new HttpException(
        await this.translationService.t(I18nKeys.ROLES.DUPLICATE_NAME),
        HttpStatus.BAD_REQUEST,
      );
    }

    return result[0];
  }

  async getRoles(query: GetRolesQueryDto) {
    const dq = this.dataSource.createQueryBuilder(Role, 'role');

    const whereConditions: string[] = [];
    const params: Record<string, any> = {};

    if (query.id) {
      if (!isUUID(query.id)) {
        throw new HttpException(
          await this.translationService.t(I18nKeys.ROLES.INVALID_ID),
          HttpStatus.BAD_REQUEST,
        );
      }
      whereConditions.push('role.id = :id');
      params.id = query.id;
    }

    if (query.name) {
      whereConditions.push('LOWER(role.name) LIKE LOWER(:name)');
      params.name = `%${query.name}%`;
    }

    if (whereConditions.length) {
      dq.where(whereConditions.join(' AND '), params);
    }

    const sortBy = query.sortBy || 'updatedAt';
    const order = query.order || 'desc';

    dq.orderBy(`role.${sortBy}`, order.toUpperCase() as 'ASC' | 'DESC');

    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const offset = (page - 1) * limit;

    dq.skip(offset).take(limit);

    dq.select(['role.id', 'role.name', 'role.updatedAt']);

    const [roles, total] = await dq.getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    return {
      roles,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  }
}
