import { IsNumber, IsString } from 'class-validator';

export class GuestFlowCreateDto {
  @IsString()
  khachhang: string;

  // @IsNumber()
  // phuongtien: number;

  // @IsNumber()
  // soluongnguoi: number;
}
