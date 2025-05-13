export type ProfileNhanVienType = {
  ma_nv?: string;
  ten_nv?: string;
  url_hinhanh?: string;
  dienthoai?: string;
  email?: string;
  facebook?: string;
  zalo?: string;
  mota?: string;
  diachi_thuongtru?: string;
  profile_nhanvien_quatrinhlamviec?: ProfileQuaTrinhLamViecType[];
  profile_nhanvien_dinhhuong?: ProfileDinhHuongType[];
  profile_nhanvien_kynang?: ProfileKyNangType[];
  profile_nhanvien_hocvan?: ProfileHocVanType[];
  profile_nhanvien_hinhanh?: ProfileHinhAnhType[];
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
};

export type ProfileKyNangType = {
  id?: string;
  stt?: number;
  ten_kynang?: string;
  phantram_kynang?: number;
};

export type ProfileQuaTrinhLamViecType = {
  id?: string;
  stt?: number;
  thoigian_qtlv?: string;
  congty_qtlv?: string;
  vitri_qtlv?: string;
  mota_qtlv?: string;
};

export type ProfileHocVanType = {
  stt?: number;
  thoigian_hocvan?: string;
  tentruong_hocvan?: string;
  chuyennganh_hocvan?: string;
  bangcap_hocvan?: string;
};
