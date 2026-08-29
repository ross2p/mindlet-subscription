import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from '@ross2p/common';
import { MySubscriptionModule } from './my-subscription/my-subscription.module';
import { SubscriptionPlanModule } from './subscription-plan/subscription-plan.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot({ isGlobal: true }),
    SubscriptionModule,
    SubscriptionPlanModule,
    MySubscriptionModule,
  ],
})
export class AppModule {}
