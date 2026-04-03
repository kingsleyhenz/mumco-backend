import EventRepo from '../../database/repositories/EventRepo';
import { ErrorMessages, NotFoundError } from '../../lib/errors';
import cloudinary from '../../lib/cloudinary';
import { CreateEventDto, EventIdDto, UpdateEventDto } from './events.dto';
import { ValidateDto } from '../../lib/core/httpSetup';

const splitMediaByType = (uploads: { secure_url: string; resource_type: string }[]) => {
  const images = uploads.filter((upload) => upload.resource_type === 'image').map((upload) => upload.secure_url);
  const videos = uploads.filter((upload) => upload.resource_type === 'video').map((upload) => upload.secure_url);

  return { images, videos };
};

export default class EventsService {
  @ValidateDto(CreateEventDto)
  static async createEvent(dto: CreateEventDto, files: Express.Multer.File[] = []) {
    const uploads = await Promise.all(files.map((file) => cloudinary.uploadFile(file)));
    const uploadedMedia = splitMediaByType(uploads);

    return EventRepo.createEvent({
      title: dto.title,
      description: dto.description,
      eventDate: new Date(dto.eventDate),
      images: [...(dto.images || []), ...uploadedMedia.images],
      videos: [...(dto.videos || []), ...uploadedMedia.videos],
    });
  }

  static async getEvents() {
    return EventRepo.getEvents();
  }

  @ValidateDto(UpdateEventDto)
  static async updateEvent(dto: UpdateEventDto, id: string, files: Express.Multer.File[] = []) {
    const existingEvent = await EventRepo.getEventById(id);
    if (!existingEvent) {
      throw new NotFoundError(ErrorMessages.ITEM_NOT_FOUND.replace('%k', 'event'));
    }

    const uploads = await Promise.all(files.map((file) => cloudinary.uploadFile(file)));
    const uploadedMedia = splitMediaByType(uploads);

    return EventRepo.updateEventById(id, {
      title: dto.title,
      description: dto.description,
      eventDate: dto.eventDate !== undefined ? new Date(dto.eventDate) : undefined,
      images: dto.images ? [...dto.images, ...uploadedMedia.images] : [...existingEvent.images, ...uploadedMedia.images],
      videos: dto.videos ? [...dto.videos, ...uploadedMedia.videos] : [...existingEvent.videos, ...uploadedMedia.videos],
    });
  }

  @ValidateDto(EventIdDto)
  static async deleteEvent(dto: EventIdDto) {
    const existingEvent = await EventRepo.getEventById(dto.eventId);
    if (!existingEvent) {
      throw new NotFoundError(ErrorMessages.ITEM_NOT_FOUND.replace('%k', 'event'));
    }

    await EventRepo.deleteEventById(dto.eventId);
    return { id: dto.eventId };
  }
}
