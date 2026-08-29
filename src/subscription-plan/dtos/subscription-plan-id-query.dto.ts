import { ApiProperty } from '@nestjs/swagger';

export class SubscriptionPlanIdQueryDto {
  @ApiProperty({
    description: 'Unique identifier of the subscription plan',
    format: 'uuid',
  })
  planId!: string;
}
