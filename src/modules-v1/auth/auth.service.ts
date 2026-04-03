import { UserRole } from '@prisma/client';
import UserRepo from '../../database/repositories/UserRepo';
import { LoginDto } from './auth.dto';
import { bcryptCompare } from '../../lib/utils';
import { ErrorMessages, ServiceError } from '../../lib/errors';
import { createSession } from '../../lib/utils/auth';
import { ValidateDto } from '../../lib/core/httpSetup';

export default class AuthService {
  @ValidateDto(LoginDto)
  static async login(dto: LoginDto) {
    const user = await UserRepo.getUserByEmailOrUsername(dto.identifier);

    if (!user) {
      throw new ServiceError(ErrorMessages.LOGIN_CREDENTIALS_INVALID);
    }

    const passwordsMatch = await bcryptCompare(dto.password, user.password);

    if (!passwordsMatch) {
      throw new ServiceError(ErrorMessages.LOGIN_CREDENTIALS_INVALID);
    }

    if (user.role !== UserRole.ADMIN) {
      throw new ServiceError(ErrorMessages.NOT_AUTHORIZED, 403);
    }

    const { token, expires } = await createSession(user);

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      token,
      tokenExpiresOn: new Date(expires).toISOString(),
    };
  }
}
