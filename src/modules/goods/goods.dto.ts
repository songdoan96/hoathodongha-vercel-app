import { IsArray, IsOptional, IsString } from 'class-validator';

export class GoodsCreateDto {
  @IsString()
  hoten: string;

  @IsString()
  bophan: string;

  @IsString()
  @IsOptional()
  tungay: string;

  @IsArray()
  taisan: {
    hanghoa: string;
    soluong: number;
    lydo: string | null;
  }[];
}
