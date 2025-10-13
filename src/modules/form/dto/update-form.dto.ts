import { PartialType } from '@nestjs/mapped-types';
import { CreateFormDto } from './create-form.dto';
import { $Enums, Prisma } from '../../../../generated/prisma';

export class UpdateFormDto implements Prisma.FormCreateInput {
  ngaytao?: string | Date | undefined;
  loaidon?: $Enums.LOAIDON | undefined;
  hoten: string;
  msnv: string;
  to: string;
  lydo?: string | null | undefined;
  thaythe?: boolean | undefined;
  chuaxong?: boolean | undefined;
  totruong?: string | null | undefined;
  quandoc?: string | null | undefined;
  lanhdao?: string | null | undefined;
  songaynghi?: string | null | undefined;
  tungay?: string | Date | null | undefined;
  denngay?: string | Date | null | undefined;
  rangay?: string | Date | null | undefined;
  tugio?: string | null | undefined;
  dengio?: string | null | undefined;
  giora?: string | null | undefined;
  giovao?: string | null | undefined;
}
