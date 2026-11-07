import { IsNumber, IsString, IsOptional } from 'class-validator';

export class GuestFlowCreateDto {
  @IsString()
  khachhang: string;

  @IsNumber()
  phuongtien: number;

  @IsNumber()
  soluongnguoi: number;

  @IsString()
  @IsOptional()
  bienso?: string;
}
export class GuestFlowOutCreateDto {
  @IsString()
  guestFlowId: string;

  @IsString()
  @IsOptional()
  ghichu?: string;

  @IsNumber()
  soluong: number;
}
