export interface NhanVienType {
  soid: string;
  ma_nv?: string;
  ten_nv?: string;
  url_hinhanh?: string;
  dienthoai?: string;
  email?: string;
  facebook?: string;
  zalo?: string;
  ma_tinhthanhpho?: string;
  ten_tinhthanhpho?: string;
  ma_quanhuyen?: string;
  ten_quanhuyen?: string;
  ma_phuongxa?: string;
  ten_phuongxa?: string;
  diachi_thuongtru?: string;
  ma_chucvu?: string;
  ten_chucvu?: string;
  ma_nv_tuyendung?: string;
  ten_nv_tuyendung?: string;
  ngaysinh?: Date;
  ngaysinh_string?: string;
}
export const NhanVienTypeDefault: NhanVienType = {
  soid: "",
  ma_nv: "",
  ten_nv: "",
};
