export interface NhanVienType {
  soid: string;
  ma_nv?: string;
  ten_nv?: string;
  url_hinhanh?: string;
  dienthoai?: string;
  email?: string;
  facebook?: string;
  zalo?: string;
  mota?: string;
}
export const NhanVienTypeDefault: NhanVienType = {
  soid: "",
  ma_nv: "",
  ten_nv: "",
};
