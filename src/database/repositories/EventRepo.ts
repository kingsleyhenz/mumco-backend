import { Prisma } from '@prisma/client';
import prisma from '..';

export default class EventRepo {
  public static createEvent = async (data: Prisma.EventCreateInput) => {
    return prisma.event.create({ data });
  };

  public static getEvents = async () => {
    return prisma.event.findMany({
      orderBy: { eventDate: 'desc' },
    });
  };

  public static getEventById = async (id: string) => {
    return prisma.event.findUnique({ where: { id } });
  };

  public static updateEventById = async (id: string, data: Prisma.EventUpdateInput) => {
    return prisma.event.update({ where: { id }, data });
  };

  public static deleteEventById = async (id: string) => {
    return prisma.event.delete({ where: { id } });
  };
}
