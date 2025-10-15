import { UserEntity } from '@ross2p/database';
import { Controller, Delete, Get } from '@nestjs/common';
import { SubscriptionService } from './../subscription/subscription.service';
import { UserDetails } from '@ross2p/common/dist/decorators/user-details.decorator';

@Controller('my')
export class MySubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  async getMySubscription(@UserDetails() user: UserEntity) {
    return this.subscriptionService.findActiveSubscriptionByUserId(user.id);
  }

  @Delete()
  async cancelMySubscription(@UserDetails() user: UserEntity) {
    return this.subscriptionService.cancelActiveSubscriptionByUserId(user.id);
  }
}
