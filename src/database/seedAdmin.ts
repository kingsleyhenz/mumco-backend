import { UserRole } from '@prisma/client';
import prisma from '.';
import { bcryptHash } from '../lib/utils';

interface SeedAdminParams {
  email: string;
  username: string;
  password: string;
}

const DEFAULT_ADMIN: SeedAdminParams = {
  email: 'ayehenz29@gmail.com',
  username: 'Henzy',
  password: '123456',
};

export async function seedAdmin(params: Partial<SeedAdminParams> = {}) {
  const email = (params.email ?? DEFAULT_ADMIN.email).toLowerCase();
  const username = (params.username ?? DEFAULT_ADMIN.username).toLowerCase();
  const password = params.password ?? DEFAULT_ADMIN.password;

  const existingAdmin = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (existingAdmin) {
    return existingAdmin;
  }

  const passwordHash = await bcryptHash(password);

  return prisma.user.create({
    data: {
      email,
      username,
      password: passwordHash,
      role: UserRole.ADMIN,
    },
  });
}
