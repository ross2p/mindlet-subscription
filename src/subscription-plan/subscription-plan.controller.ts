import { SubscriptionPlanService } from './subscription-plan.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('plan')
export class SubscriptionPlanController {
  constructor(
    private readonly subscriptionPlanService: SubscriptionPlanService,
  ) {}

  @Get()
  async findAllSubscriptionPlans() {
    return this.subscriptionPlanService.findAllSubscriptionPlans();
  }

  @Get(':id')
  async findSubscriptionPlanById(@Param('id') id: string) {
    return this.subscriptionPlanService.findSubscriptionPlanById(id);
  }
}
