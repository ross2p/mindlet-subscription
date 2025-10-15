import { UpdateSubscriptionDto } from './dtos/update-subscription.dto';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@ross2p/database';
import { CreateSubscriptionDto } from './dtos/create-subscription.dto';

@Injectable()
export class SubscriptionRepository {
  private readonly subscriptionRepository;
  constructor(db: DatabaseService) {
    this.subscriptionRepository = db.client.subscription;
  }

  async createSubscription(data: CreateSubscriptionDto) {
    return null;
  }

  async findSubscriptionById(id: string) {
    return null;
  }

  async findActiveSubscriptionByUserId(userId: string) {
    return null;
  }

  async updateSubscription(id: string, data: UpdateSubscriptionDto) {
    return null;
  }
}
