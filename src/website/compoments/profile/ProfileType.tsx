export type ProfileType = {
  ma_nv?: string;
  ten_nv?: string;
  url_hinhanh?: string;
  dienthoai?: string;
  email?: string;
  facebook?: string;
  zalo?: string;
  diachi_thuongtru?: string;
  qtlv?: ProfileQuaTrinhLamViecType[];
  mota?: string;
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
