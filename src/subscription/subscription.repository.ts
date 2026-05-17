import { UpdateSubscriptionDto } from './dtos/update-subscription.dto';
import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dtos/create-subscription.dto';

const REPO_STUB_MSG =
  'Repository not implemented: per-service DB pending';

/** Shape aligned with former Prisma `Subscription` model (per-service DB TBD). */
export interface SubscriptionRecord {
  id: string;
  userId: string;
  planId: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

@Injectable()
export class SubscriptionRepository {
  async createSubscription(
    _data: CreateSubscriptionDto,
  ): Promise<SubscriptionRecord> {
    throw new Error(REPO_STUB_MSG);
  }

  async findSubscriptionById(_id: string): Promise<SubscriptionRecord | null> {
    throw new Error(REPO_STUB_MSG);
  }

  async findActiveSubscriptionByUserId(
    _userId: string,
  ): Promise<SubscriptionRecord | null> {
    throw new Error(REPO_STUB_MSG);
  }

  async updateSubscription(
    _id: string,
    _data: UpdateSubscriptionDto,
  ): Promise<SubscriptionRecord> {
    throw new Error(REPO_STUB_MSG);
  }
}
