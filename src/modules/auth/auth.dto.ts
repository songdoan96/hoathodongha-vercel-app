import { IsNotEmpty, IsString } from 'class-validator';
import { Prisma } from '../../../generated/prisma';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
export class AuthCreateDto implements Prisma.UserCreateInput {
  username: string;
  name: string;
  password?: string | null | undefined;
  bophan?: string | null | undefined;
}
export class AuthUpdateDto implements Prisma.UserUpdateInput {}
