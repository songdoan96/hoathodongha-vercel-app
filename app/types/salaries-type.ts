export interface SalariesType {
  id: string;
  thang: Date;
  to: string;
  cccd: string;
  msnv: string;
  hoten: string;
  luong_toi_thieu_cty?: number | null;
  ngay_cong_binh_thuong?: number | null;
  gio_cong_chu_nhat?: number | null;
  gio_cong_tang_ca?: number | null;
  ngay_gio_cong_ca_dem_ca3?: number | null;
  tien_luong_sp_theo_cong_doan?: number | null;
  tien_luong_sp_trong_gio?: number | null;
  tien_luong_tang_ca_cn_ca3?: number | null;
  phu_cap_ca3_ca_dem?: number | null;
  bo_sung_luong_qd_943?: number | null;
  tong_cong_tien_luong_sp?: number | null;
  so_gio_nghi_tang_ca?: number | null;
  tien_luong_nghi_an_tang_ca?: number | null;
  tien_luong_1h5_hanh_kinh_nu?: number | null;
  so_gio_thai_duoi_7_thang?: number | null;
  so_gio_cho_con_bu_thai_tren_7_thang?: number | null;
  tien_luong_1h_cho_con_bu?: number | null;
  ho_tro_10_phan_tram_luong_sp_con_duoi_12_thang?: number | null;
  ho_tro_cn_moi_thang_1_2?: number | null;
  tien_gio_hoc_tap_huan_luyen?: number | null;
  tien_thuong_chuyen_can?: number | null;
  bo_sung_luong_theo_ngay_cong?: number | null;
  ho_tro_tien_xang_xe?: number | null;
  gio_nghi_ngan?: number | null;
  tien_luong_nghi_ngan?: number | null;
  tien_ho_tro_con_nha_tre?: number | null;
  ho_tro_luong?: number | null;
  phu_cap_nong?: number | null;
  bo_sung_luong?: number | null;
  tong_cong_tien_luong_sp_bu_luong_toi_thieu?: number | null;
  tien_luong_bu?: number | null;
  hoan_tra_bhxh_bhtn_bhyt?: number | null;
  ngay_che_do?: number | null;
  ngay_phep_nam?: number | null;
  tien_luong_phep?: number | null;
  tong_cong_tien_luong?: number | null;
  boc_xep?: number | null;
  tru_ung_truy_thu?: number | null;
  bhxh_bhtn_bhyt?: number | null;
  tien_luong_thuc_linh: number;

  salaryNotes?: SalaryNoteType[];
}
export interface SalaryNoteType {
  id: string;
  note: string;
  done: boolean;
}
