import { Controller, Delete, Get } from '@nestjs/common';
import { AuthenticatedUser, UserDetails } from '@ross2p/common';
import { SubscriptionService } from './../subscription/subscription.service';

@Controller('my')
export class MySubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  async getMySubscription(@UserDetails() user: AuthenticatedUser) {
    return this.subscriptionService.findActiveSubscriptionByUserId(user.id);
  }

  @Delete()
  async cancelMySubscription(@UserDetails() user: AuthenticatedUser) {
    return this.subscriptionService.cancelActiveSubscriptionByUserId(user.id);
  }
}
