import { Module } from '@nestjs/common';
import { SubscriptionModule } from '../subscription/subscription.module';
import { MySubscriptionController } from './my-subscription.controller';

@Module({
  imports: [SubscriptionModule],
  controllers: [MySubscriptionController],
})
export class MySubscriptionModule {}
