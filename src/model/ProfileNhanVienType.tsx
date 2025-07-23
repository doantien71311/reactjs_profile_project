export type ProfileNhanVienType = {
  soid?: string;
  ma_nv?: string;
  //
  ten_nv?: string;
  url_hinhanh?: string;
  dienthoai?: string;
  email?: string;
  facebook?: string;
  zalo?: string;
  mota?: string;
  diachi_thuongtru?: string;
  //
  profile_nhanvien_quatrinhlamviec?: ProfileQuaTrinhLamViecType[];
  profile_nhanvien_dinhhuong?: ProfileDinhHuongType[];
  profile_nhanvien_kynang?: ProfileKyNangType[];
  profile_nhanvien_hocvan?: ProfileHocVanType[];
  profile_nhanvien_hinhanh?: ProfileHinhAnhType[];
  //
  ten_nv_en?: string;
  dienthoai_en?: string;
  email_en?: string;
  facebook_en?: string;
  zalo_en?: string;
  mota_en?: string;
  diachi_thuongtru_en?: string;
  //
  ten_nv_translate?: string;
  dienthoai_translate?: string;
  email_translate?: string;
  facebook_translate?: string;
  zalo_translate?: string;
  mota_translate?: string;
  diachi_thuongtru_translate?: string;
};

export type ProfileHinhAnhType = {
  id?: string;
  stt?: number;
  ma_hinhanh?: string;
  ten_hinhanh?: string;
  url_hinhanh?: string;
};

export type ProfileDinhHuongType = {
  id?: string;
  stt?: number;
  noidung?: string;
  noidung_en?: string;
  noidung_translate?: string;
};

export type ProfileKyNangType = {
  id?: string;
  stt?: number;
  ten_kynang?: string;
  phantram_kynang?: number;
  //
  ten_kynang_en?: string;
  //
  ten_kynang_translate?: string;
};

export type ProfileQuaTrinhLamViecType = {
  id?: string;
  stt?: number;
  thoigian_qtlv?: string;
  congty_qtlv?: string;
  vitri_qtlv?: string;
  mota_qtlv?: string;
  //
  thoigian_qtlv_en?: string;
  congty_qtlv_en?: string;
  vitri_qtlv_en?: string;
  mota_qtlv_en?: string;
  //
  thoigian_qtlv_translate?: string;
  congty_qtlv_translate?: string;
  vitri_qtlv_translate?: string;
  mota_qtlv_translate?: string;
};

export type ProfileHocVanType = {
  id?: string;
  stt?: number;
  thoigian_hocvan?: string;
  tentruong_hocvan?: string;
  chuyennganh_hocvan?: string;
  bangcap_hocvan?: string;
  //
  tentruong_hocvan_en?: string;
  chuyennganh_hocvan_en?: string;
  bangcap_hocvan_en?: string;
  //
  tentruong_hocvan_translate?: string;
  chuyennganh_hocvan_translate?: string;
  bangcap_hocvan_translate?: string;
};
