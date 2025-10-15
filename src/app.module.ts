import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { SubscriptionModule } from './subscription/subscription.module';
import { SubscriptionPlanModule } from './subscription-plan/subscription-plan.module';
import { MySubscriptionModule } from './my-subscription/my-subscription.module';

@Module({
  imports: [
    SubscriptionModule,
    SubscriptionPlanModule,
    MySubscriptionModule,

    RouterModule.register([
      {
        path: 'subscription',
        module: SubscriptionModule,
        children: [SubscriptionPlanModule, MySubscriptionModule],
      },
    ]),
  ],
})
export class AppModule {}
