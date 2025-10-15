import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@ross2p/database';

@Injectable()
export class SubscriptionPlanRepository {
  private subscriptionPlanRepository;

  constructor(db: DatabaseService) {
    this.subscriptionPlanRepository = db.client.subscriptionPlan;
  }
  async findAllSubscriptionPlans() {
    return this.subscriptionPlanRepository.findMany();
  }

  async findSubscriptionPlanById(id: string) {
    return this.subscriptionPlanRepository.findUnique({
      where: { id },
    });
  }
}
