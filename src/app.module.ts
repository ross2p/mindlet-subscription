import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import {
  CommonModule,
  ErrorFilter,
  ExceptionFilter,
  GlobalFilter,
  globalPipe,
  RpcExpiryInterceptor,
} from '@ross2p/common';
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
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RpcExpiryInterceptor,
    },
    {
      provide: APP_PIPE,
      useValue: globalPipe,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
  ],
})
export class AppModule {}
