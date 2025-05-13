export type ProfileType = {
  ma_nv?: string;
  ten_nv?: string;
  url_hinhanh?: string;
  dienthoai?: string;
  email?: string;
  facebook?: string;
  zalo?: string;
  mota?: string;
  diachi_thuongtru?: string;
  qtlv?: ProfileQuaTrinhLamViecType[];
  dh?: ProfileDinhHuongType[];
  kn?: ProfileKyNangType[];
  hv?: ProfileHocVanType[];
  ha?: ProfileHinhAnhType[];
};

export type ProfileHinhAnhType = {
  ma_nv?: string;
  url_hinhanh?: string;
};

export type ProfileQuaTrinhLamViecType = {
  ma_nv?: string;
  ten_nv?: string;
  cty?: string;
  chucvu?: string;
  thoigian?: string;
  mota?: string;
  stt?: number;
};
export type ProfileKyNangType = {
  ten_kynang?: string;
  phantram?: number;
  stt?: number;
};

export type ProfileDinhHuongType = {
  noidung?: string;
};

export type ProfileHocVanType = {
  stt?: number;
  thoigian_daotao?: string;
  ten_truong?: string;
  chuyen_nganh?: string;
  bang_cap?: string;
};
