import { Module } from '@nestjs/common';
import { MySubscriptionController } from './my-subscription.controller';

@Module({
  controllers: [MySubscriptionController],
})
export class MySubscriptionModule {}
