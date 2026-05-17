import { Injectable } from '@nestjs/common';

const REPO_STUB_MSG =
  'Repository not implemented: per-service DB pending';

export interface SubscriptionPlanRecord {
  id: string;
  name: string;
  description: string;
  price: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class SubscriptionPlanRepository {
  async findAllSubscriptionPlans(): Promise<SubscriptionPlanRecord[]> {
    throw new Error(REPO_STUB_MSG);
  }

  async findSubscriptionPlanById(
    _id: string,
  ): Promise<SubscriptionPlanRecord | null> {
    throw new Error(REPO_STUB_MSG);
  }
}
