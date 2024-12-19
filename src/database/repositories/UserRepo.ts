import { User, Prisma } from "@prisma/client";
import prisma from "..";

export default class UserRepo {
  public static sensitiveData = ["password"];

  public static getUserById = async (id: string) => {
    return prisma.user.findUnique({ where: { id } });
  };

  public static getUserByClause = async (
    clause: Prisma.UserWhereUniqueInput,
  ) => {
    return prisma.user.findUnique({
      where: clause,
    });
  };

  public static getUserByEmail = async (email: string) => {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  };

  public static createUser = async (data: Prisma.UserCreateInput) => {
    return prisma.user.create({
      data,
    });
  };

  public static updateUserById = async (id: string, data: Partial<User>) => {
    await prisma.user.update({ where: { id }, data });
    return UserRepo.getUserById(id);
  };
}
