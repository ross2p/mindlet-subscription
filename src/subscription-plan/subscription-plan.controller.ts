import { Controller } from '@nestjs/common';
import * as Joi from 'joi';
import { GrpcMethod } from '@nestjs/microservices';
import { GrpcRequest, ValidationPipe } from '@ross2p/common';
import { SubscriptionPlanProto } from '../../generated/protos';
import { SubscriptionPlanIdQueryDto } from './dtos/subscription-plan-id-query.dto';
import { subscriptionPlanIdQuerySchema } from './schemas/subscription-plan-id-query.schema';
import { SubscriptionPlanService } from './subscription-plan.service';

@Controller()
export class SubscriptionPlanController
  implements SubscriptionPlanProto.SubscriptionPlanServiceController
{
  constructor(
    private readonly subscriptionPlanService: SubscriptionPlanService,
  ) {}

  @GrpcMethod('SubscriptionPlanService', 'listSubscriptionPlans')
  public async listSubscriptionPlans(): Promise<SubscriptionPlanProto.SubscriptionPlanList> {
    return {
      plans: await this.subscriptionPlanService.findAllSubscriptionPlans(),
    };
  }

  @GrpcMethod('SubscriptionPlanService', 'findSubscriptionPlanById')
  public findSubscriptionPlanById(
    @GrpcRequest(
      new ValidationPipe<SubscriptionPlanIdQueryDto>(
        subscriptionPlanIdQuerySchema,
      ),
    )
    data: SubscriptionPlanIdQueryDto,
  ): Promise<SubscriptionPlanProto.SubscriptionPlanMessage> {
    return this.subscriptionPlanService.findSubscriptionPlanById(data.planId);
  }

  @GrpcMethod('SubscriptionPlanService', 'findTeamPlanLimits')
  public findTeamPlanLimits(
    // Validated although unused today: limits will depend on the team's plan.
    @GrpcRequest(
      new ValidationPipe<{ teamId: string }>(
        Joi.object({ teamId: Joi.string().uuid().required() }),
      ),
    )
    _request: { teamId: string },
  ): SubscriptionPlanProto.TeamPlanLimits {
    return this.subscriptionPlanService.findTeamPlanLimits();
  }
}
