export class CreateOvertimesDto {
  bophan: string;
  ngay: string;
  gio: string;
  lydo: string;
  danhsach: OvertimeEmployee[];
  totruong: string;
}

class OvertimeEmployee {
  msnv: string;
  hoten: string;
}
