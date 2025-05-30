import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T = any> {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'ok' })
  status: string;

  @ApiProperty({ example: 'Successful request' })
  message: string;

  @ApiProperty({ example: new Date().toISOString() })
  timestamp: string;

  @ApiProperty({ example: {}, description: 'Payload data', required: false })
  data: T;
}
