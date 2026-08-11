import { IsArray, IsOptional, IsString } from 'class-validator';

export class GoodsCreateDto {
  @IsString()
  hoten: string;

  @IsString()
  bophan: string;

  @IsString()
  @IsOptional()
  tungay: string;

  @IsString()
  @IsOptional()
  denngay: string;

  @IsArray()
  taisan: {
    hanghoa: string;
    soluong: number;
    lydo: string | null;
  }[];
}
