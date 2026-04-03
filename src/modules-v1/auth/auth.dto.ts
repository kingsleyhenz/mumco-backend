import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  identifier: string;

  @IsString()
  @MinLength(6, {
    message: 'Password should contain at least 6 characters',
  })
  password: string;
}
