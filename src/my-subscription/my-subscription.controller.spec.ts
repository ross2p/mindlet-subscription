import { MySubscriptionController } from './my-subscription.controller';

const USER_ID = '018f0000-0000-7000-8000-000000000001';

describe('MySubscriptionController (gRPC)', () => {
  const subscriptionService = {
    findActiveSubscriptionByUserId: jest.fn(),
    cancelActiveSubscriptionByUserId: jest.fn(),
  };
  const controller = new MySubscriptionController(subscriptionService as never);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('looks up the active subscription for the user', async () => {
    subscriptionService.findActiveSubscriptionByUserId.mockResolvedValue({
      id: 's1',
    });

    const result = await controller.findActiveSubscription({ userId: USER_ID });

    expect(
      subscriptionService.findActiveSubscriptionByUserId,
    ).toHaveBeenCalledWith(USER_ID);
    expect(result).toEqual({ id: 's1' });
  });

  it('cancels the active subscription for the user', async () => {
    await controller.cancelActiveSubscription({ userId: USER_ID });

    expect(
      subscriptionService.cancelActiveSubscriptionByUserId,
    ).toHaveBeenCalledWith(USER_ID);
  });
});
