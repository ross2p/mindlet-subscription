import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { SubscriptionPlanProto, ValidationPipe } from '@ross2p/common';
import { SubscriptionPlanIdQueryDto } from './dtos/subscription-plan-id-query.dto';
import { subscriptionPlanIdQuerySchema } from './schemas/subscription-plan-id-query.schema';
import { SubscriptionPlanService } from './subscription-plan.service';

@Controller()
export class SubscriptionPlanController
  implements SubscriptionPlanProto.SubscriptionPlanServiceController
{
  constructor(
    private readonly subscriptionPlanService: SubscriptionPlanService,
  ) {}

  @GrpcMethod('SubscriptionPlanService', 'listSubscriptionPlans')
  public async listSubscriptionPlans(): Promise<SubscriptionPlanProto.SubscriptionPlanList> {
    return {
      plans: await this.subscriptionPlanService.findAllSubscriptionPlans(),
    };
  }

  @GrpcMethod('SubscriptionPlanService', 'findSubscriptionPlanById')
  public findSubscriptionPlanById(
    request: SubscriptionPlanProto.PlanIdRequest,
  ): Promise<SubscriptionPlanProto.SubscriptionPlanMessage> {
    const data = new ValidationPipe<SubscriptionPlanIdQueryDto>(
      subscriptionPlanIdQuerySchema,
    ).transform(request);
    return this.subscriptionPlanService.findSubscriptionPlanById(data.planId);
  }
}
