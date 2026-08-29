import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  DataPayload,
  SubscriptionMessage,
  SubscriptionQuery,
  ValidationPipe,
} from '@ross2p/common';
import { UserIdQueryDto } from '../subscription/dtos/user-id-query.dto';
import { userIdQuerySchema } from '../subscription/schemas/user-id-query.schema';
import { SubscriptionService } from '../subscription/subscription.service';

@Controller()
export class MySubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @MessagePattern(SubscriptionQuery.GET_ACTIVE_BY_USER)
  public getMySubscription(
    @DataPayload(new ValidationPipe(userIdQuerySchema))
    data: UserIdQueryDto,
  ) {
    return this.subscriptionService.findActiveSubscriptionByUserId(data.userId);
  }

  @MessagePattern(SubscriptionMessage.CANCEL_ACTIVE_BY_USER)
  public cancelMySubscription(
    @DataPayload(new ValidationPipe(userIdQuerySchema))
    data: UserIdQueryDto,
  ) {
    return this.subscriptionService.cancelActiveSubscriptionByUserId(
      data.userId,
    );
  }
}
