import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { SubscriptionCoreProto, ValidationPipe } from '@ross2p/common';
import { UserIdQueryDto } from '../subscription/dtos/user-id-query.dto';
import { userIdQuerySchema } from '../subscription/schemas/user-id-query.schema';
import { SubscriptionService } from '../subscription/subscription.service';

@Controller()
export class MySubscriptionController
  implements SubscriptionCoreProto.SubscriptionServiceController
{
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @GrpcMethod('SubscriptionService', 'findActiveSubscription')
  public findActiveSubscription(
    request: SubscriptionCoreProto.UserIdRequest,
  ): Promise<SubscriptionCoreProto.SubscriptionMessage> {
    const data = new ValidationPipe<UserIdQueryDto>(
      userIdQuerySchema,
    ).transform(request);
    return this.subscriptionService.findActiveSubscriptionByUserId(data.userId);
  }

  @GrpcMethod('SubscriptionService', 'cancelActiveSubscription')
  public cancelActiveSubscription(
    request: SubscriptionCoreProto.UserIdRequest,
  ): Promise<SubscriptionCoreProto.SubscriptionMessage> {
    const data = new ValidationPipe<UserIdQueryDto>(
      userIdQuerySchema,
    ).transform(request);
    return this.subscriptionService.cancelActiveSubscriptionByUserId(
      data.userId,
    );
  }
}
