export interface NhanVienType {
  id: string;
  ma_hh: string;
  ma_hh_nhacungcap?: string;
  ten_hh?: string;
}
export const NhanVienTypeDefault: NhanVienType = {
  id: "",
  ma_hh: "",
};
