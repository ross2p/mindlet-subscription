import { SubscriptionPlanController } from './subscription-plan.controller';
import {
  DEFAULT_MAX_COURSES_PER_TEAM,
  SubscriptionPlanService,
} from './subscription-plan.service';

const TEAM_ID = '0190a000-0000-7000-8000-0000000000a1';

function serviceWith(value: string | undefined) {
  return new SubscriptionPlanService(
    {} as never,
    { get: () => value } as never,
  );
}

describe('SubscriptionPlanService.findTeamPlanLimits (AC-08)', () => {
  it('returns the configured course ceiling', () => {
    expect(serviceWith('12').findTeamPlanLimits()).toEqual({
      maxCoursesPerTeam: 12,
    });
  });

  it.each([undefined, '', 'abc', '0', '-3', '2.5'])(
    'falls back to the platform default for %p',
    (value) => {
      expect(serviceWith(value).findTeamPlanLimits()).toEqual({
        maxCoursesPerTeam: DEFAULT_MAX_COURSES_PER_TEAM,
      });
    },
  );
});

describe('SubscriptionPlanController.findTeamPlanLimits', () => {
  it('passes a valid team id to the service', () => {
    const service = {
      findTeamPlanLimits: jest.fn().mockReturnValue({ maxCoursesPerTeam: 7 }),
    };
    const controller = new SubscriptionPlanController(service as never);
    expect(controller.findTeamPlanLimits({ teamId: TEAM_ID })).toEqual({
      maxCoursesPerTeam: 7,
    });
    expect(service.findTeamPlanLimits).toHaveBeenCalledTimes(1);
  });

  it('rejects a malformed team id before reaching the service', () => {
    const service = { findTeamPlanLimits: jest.fn() };
    const controller = new SubscriptionPlanController(service as never);
    expect(() => controller.findTeamPlanLimits({ teamId: 'nope' })).toThrow();
    expect(service.findTeamPlanLimits).not.toHaveBeenCalled();
  });
});
