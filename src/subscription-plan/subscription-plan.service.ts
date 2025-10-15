import { checkExists } from '@ross2p/common';
import { Injectable } from '@nestjs/common';
import { SubscriptionPlanRepository } from './subscription-plan.repository';

@Injectable()
export class SubscriptionPlanService {
  constructor(
    private readonly subscriptionPlanRepository: SubscriptionPlanRepository,
  ) {}

  async findAllSubscriptionPlans() {
    return this.subscriptionPlanRepository.findAllSubscriptionPlans();
  }

  async findSubscriptionPlanById(id: string) {
    return checkExists(
      this.subscriptionPlanRepository.findSubscriptionPlanById(id),
      'Subscription plan not found',
    );
  }
}
