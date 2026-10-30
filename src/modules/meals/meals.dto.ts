import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class MealsUpdateNextDayDto {
  @IsNumber()
  firstQty: number;

  @IsNumber()
  secondQty: number;

  @IsNumber()
  thirdQty: number;

  @IsString()
  bophan: string;

  @IsString()
  id: string;
}

export class MealsCreateDto {
  /*
      ngay: '2026-11-13',
  first: 'Miến gà',
  second: 'Miến gà',
  third: 'Miến gà',
  isSpecial: false
    */

  @IsString()
  ngay: string;

  @IsString()
  first: string;

  @IsString()
  second: string;

  @IsString()
  third: string;

  @IsBoolean()
  isSpecial: boolean;
}
