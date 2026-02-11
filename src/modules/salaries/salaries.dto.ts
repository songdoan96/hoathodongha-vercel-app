import {
  IsString,
  IsNotEmpty,
  IsMongoId,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class SalariesCheckDto {
  msnv: string;
  cccd: string;
  token?: string;
}
export class SalariesCreateNoteDto {
  @IsString()
  @IsNotEmpty()
  chat: string;

  @IsMongoId()
  salaryId: string;

  @IsBoolean()
  @IsOptional()
  isEmployee?: boolean;
}
