import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('roles')
export class Role {
  @ApiProperty({
    type: String,
    format: 'uuid',
    description: 'Unique identifier for the role',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: String,
    maxLength: 50,
    description: 'Name of the role',
    uniqueItems: true,
  })
  @Column({ unique: true, length: 50 })
  name: string;

  @ApiProperty({ type: Date, description: 'Date when the role was created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'Date when the role was last updated',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    type: Date,
    required: false,
    description: 'Date when the role was deleted (soft delete)',
  })
  @DeleteDateColumn()
  deletedAt?: Date;

  @ApiProperty({
    type: () => [User],
    description: 'Users assigned to this role',
    required: false,
  })
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
