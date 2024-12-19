import nock from 'nock';

export const nockFlutterWaveAccountResolveEndpoint = (name: string) => {
  nock('https://api.flutterwave.com')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
    })
    .post(/accounts\/resolve/)
    .reply(200, {
      status: 'success',
      message: 'Account details fetched',
      data: {
        account_number: '3089273822',
        account_name: name,
      },
    });
};

export const nockPayStackBvnResolveEndpoint = (bvn: string) => {
  nock('https://api.paystack.co')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
    })
    .post(/bvn/, (body) => !!body)
    .reply(200, {
      status: true,
      message: 'BVN lookup successful',
      data: {
        bvn,
        is_blacklisted: false,
        account_number: true,
        first_name: true,
        last_name: true,
      },
      meta: { calls_this_month: 2, free_calls_left: 8 },
    });
};
