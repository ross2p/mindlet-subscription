import { Injectable } from '@nestjs/common';
import { SubscriptionRepository } from './subscription.repository';
import { CreateSubscriptionDto } from './dtos/create-subscription.dto';
import { UpdateSubscriptionDto } from './dtos/update-subscription.dto';
import { checkExists } from '@ross2p/common';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  // TODO: wrap in DB transaction when per-service Prisma is added
  async createSubscription(data: CreateSubscriptionDto) {
    const activeSubscription =
      await this.subscriptionRepository.findActiveSubscriptionByUserId(
        data.userId,
      );

    if (activeSubscription) {
      await this.cancelActiveSubscriptionByUserId(data.userId);
    }
    return this.subscriptionRepository.createSubscription(data);
  }

  async findSubscriptionById(id: string) {
    return checkExists(
      this.subscriptionRepository.findSubscriptionById(id),
      'Subscription not found',
    );
  }

  async findActiveSubscriptionByUserId(userId: string) {
    return checkExists(
      this.subscriptionRepository.findActiveSubscriptionByUserId(userId),
      'No active subscription found for this user',
    );
  }

  async updateSubscription(id: string, data: UpdateSubscriptionDto) {
    return this.subscriptionRepository.updateSubscription(id, data);
  }

  async cancelActiveSubscriptionByUserId(userId: string) {
    const activeSubscription =
      await this.findActiveSubscriptionByUserId(userId);
    return this.updateSubscription(activeSubscription.id, {
      deletedAt: new Date(),
    });
  }
}
