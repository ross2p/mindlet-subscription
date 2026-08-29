import { ApiProperty } from '@nestjs/swagger';

export class UserIdQueryDto {
  @ApiProperty({
    description: 'Unique identifier of the user',
    format: 'uuid',
  })
  userId!: string;
}
