/* eslint-disable no-await-in-loop */
import _ from 'lodash';

import config from '../../../config';
import * as utils from '../../../lib/utils';
import redis from '../../../database/redis';

import { wrapServiceAction } from '../../../lib/utils';
import { ErrorMessages, ServiceError } from '../../../lib/errors';

import UserRepo from '../../../database/repositories/UserRepo';
import { TokenFlag } from '../../../database/enum';
import { RegisterRequest } from '../validators';

export default wrapServiceAction({
  schema: RegisterRequest,
  handler: async (params: RegisterRequest) => {
    const existingUserWithEmail = await UserRepo.getUserByEmail(params.email);
    if (existingUserWithEmail) {
      throw new ServiceError(ErrorMessages.ITEM_EXISTS.replace('%k', 'a user with this email'));
    }

    const user = await UserRepo.createUser({
      email: params.email,
      firstName: params.firstName,
      lastName: params.lastName,
      password: await utils.bcryptHash(params.password),
    });

    const token = await utils.generateJWTToken({ userId: user.id, flag: TokenFlag.EMAIL_VERIFICATION });

    const code = config.env.isProduction ? utils.generateRandomCode(64) : '12345';

    const hash = await utils.bcryptHash(code);

    await redis.setex(`verification:email:${user.id}`, 30 * 60, hash);

    // TODO: send verification mail

    return {
      user: _.omit(user, UserRepo.sensitiveData),
      token,
    };
  },
});
