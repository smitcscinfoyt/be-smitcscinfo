import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../../roles/enitities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: 'c8e5c9d2-4137-4b96-81e0-77a9f994eb19',
  })
  id: string;

  @Column()
  @ApiProperty({ description: 'Full name of the user', example: 'Jane Doe' })
  name: string;

  @Column({ unique: true })
  @ApiProperty({
    description: 'Email address of the user',
    example: 'jane.doe@example.com',
  })
  email: string;

  @Column({ nullable: true })
  @ApiPropertyOptional({
    description: 'Hashed password for manual login (optional if using OAuth)',
    example: '$2b$10$Abc...',
  })
  password?: string;

  @CreateDateColumn()
  @ApiProperty({ description: 'User creation timestamp' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Last update timestamp for the user' })
  updatedAt: Date;

  @ApiProperty({
    description: 'Role assigned to the user',
    type: () => Role,
  })
  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
}
