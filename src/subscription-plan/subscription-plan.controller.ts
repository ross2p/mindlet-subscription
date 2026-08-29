import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  DataPayload,
  SubscriptionPlanQuery,
  ValidationPipe,
} from '@ross2p/common';
import { SubscriptionPlanIdQueryDto } from './dtos/subscription-plan-id-query.dto';
import { subscriptionPlanIdQuerySchema } from './schemas/subscription-plan-id-query.schema';
import { SubscriptionPlanService } from './subscription-plan.service';

@Controller()
export class SubscriptionPlanController {
  constructor(
    private readonly subscriptionPlanService: SubscriptionPlanService,
  ) {}

  @MessagePattern(SubscriptionPlanQuery.LIST)
  public findAllSubscriptionPlans() {
    return this.subscriptionPlanService.findAllSubscriptionPlans();
  }

  @MessagePattern(SubscriptionPlanQuery.GET_BY_ID)
  public findSubscriptionPlanById(
    @DataPayload(new ValidationPipe(subscriptionPlanIdQuerySchema))
    data: SubscriptionPlanIdQueryDto,
  ) {
    return this.subscriptionPlanService.findSubscriptionPlanById(data.planId);
  }
}
