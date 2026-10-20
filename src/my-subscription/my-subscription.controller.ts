import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GrpcRequest, ValidationPipe } from '@ross2p/common';
import { SubscriptionCoreProto } from '../../generated/protos';
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
    @GrpcRequest(new ValidationPipe<UserIdQueryDto>(userIdQuerySchema))
    data: UserIdQueryDto,
  ): Promise<SubscriptionCoreProto.SubscriptionMessage> {
    return this.subscriptionService.findActiveSubscriptionByUserId(data.userId);
  }

  @GrpcMethod('SubscriptionService', 'cancelActiveSubscription')
  public cancelActiveSubscription(
    @GrpcRequest(new ValidationPipe<UserIdQueryDto>(userIdQuerySchema))
    data: UserIdQueryDto,
  ): Promise<SubscriptionCoreProto.SubscriptionMessage> {
    return this.subscriptionService.cancelActiveSubscriptionByUserId(
      data.userId,
    );
  }
}
