import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { IsPasswordStrong } from 'src/utils/request/request.decorator';

export class UserCreateValidation {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  @Type(() => String)
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(30)
  @Type(() => String)
  readonly firstName: string;

  @IsString()
  @IsOptional()
  @ValidateIf((e) => e.lastName !== '')
  @MinLength(1)
  @MaxLength(30)
  @Type(() => String)
  readonly lastName?: string;

  @IsString()
  @MinLength(10)
  @MaxLength(14)
  @Type(() => String)
  readonly mobileNumber: string;

  @IsNotEmpty()
  readonly role: string;

  @IsNotEmpty()
  @IsPasswordStrong()
  readonly password: string;
}
