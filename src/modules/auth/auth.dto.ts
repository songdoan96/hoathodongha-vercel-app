import { IsOptional, IsString } from 'class-validator';
import { Prisma } from '../../../generated/prisma';

export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  fcm_token: string;
}
// export class AuthCreateDto {
//   @IsString()
//   username: string;

//   @IsString()
//   password: string;
// }
// export class AuthUpdateDto {
//   @IsString()
//   username: string;

//   @IsString()
//   password: string;
// }
export class AuthCreateDto implements Prisma.UserCreateInput {
  username: string;
  name: string;
  password?: string | null | undefined;
  bophan?: string | null | undefined;
}
export class AuthUpdateDto implements Prisma.UserUpdateInput {}
