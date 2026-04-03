import { Transform } from 'class-transformer';
import { IsArray, IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  /** ISO 8601 datetime for when the event occurred (distinct from record `createdAt`). */
  @IsDateString()
  eventDate: string;

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => (Array.isArray(value) ? value : []))
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => (Array.isArray(value) ? value : []))
  @IsString({ each: true })
  videos?: string[];
}

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  eventDate?: string;

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => (Array.isArray(value) ? value : []))
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => (Array.isArray(value) ? value : []))
  @IsString({ each: true })
  videos?: string[];
}

export class EventIdDto {
  @IsUUID()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  eventId: string;
}
