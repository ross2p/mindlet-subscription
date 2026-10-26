import { checkExists } from '@ross2p/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SubscriptionPlanRepository } from './subscription-plan.repository';

/** Placeholder platform ceiling until plan limits are stored (spec 16, limits.max_courses_per_team). */
export const DEFAULT_MAX_COURSES_PER_TEAM = 50;

@Injectable()
export class SubscriptionPlanService {
  constructor(
    private readonly subscriptionPlanRepository: SubscriptionPlanRepository,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Plans are not stored yet (the repository is a stub), so every team gets the platform
   * ceiling from configuration. The signature already takes the team so real per-plan limits
   * can replace this without touching callers.
   */
  findTeamPlanLimits(): { maxCoursesPerTeam: number } {
    const configured = Number(
      this.configService.get<string>('MAX_COURSES_PER_TEAM'),
    );
    return {
      maxCoursesPerTeam:
        Number.isInteger(configured) && configured > 0
          ? configured
          : DEFAULT_MAX_COURSES_PER_TEAM,
    };
  }

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
