export class CreateOvertimesDto {
  bophan: string;
  ngay?: string;
  gio: string;
  lydo: string;
  danhsach: OvertimeEmployee[];
  totruong: string;
  tungay: string;
  denngay: string;
}

// class OvertimeEmployee {
//   msnv: string;
//   hoten: string;
//   status: boolean;
// }
class OvertimeEmployee {
  msnv: string;
  hoten: string;
  days?: OvertimeDayEmployee[];
}

class OvertimeDayEmployee {
  day: string;
  status: boolean;
}
