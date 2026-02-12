import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class EmployeeCreateDto {
  @IsString()
  msnv: string;

  @IsString()
  hoten: string;

  @IsString()
  @IsOptional()
  bophan: string;

  @IsString()
  @IsOptional()
  fcm_token: string;

  @IsString()
  @IsOptional()
  cccd: string;
}
export class EmployeeUpdateDto extends PartialType(EmployeeCreateDto) {
  @IsBoolean()
  @IsOptional()
  active: boolean;
}
/*
 id        String  @id @default(auto()) @map("_id") @db.ObjectId
  msnv      String  @unique
  hoten     String
  bophan    String?
  active    Boolean @default(true)
  fcm_token String?
  cccd      String?
*/
