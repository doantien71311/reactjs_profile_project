export interface FukudaSonSanPhamType {
  id: string;
  ma_hh: string;
  ma_hh_nhacungcap?: string;
  ten_hh?: string;
  hinhanh_url?: string;
  ten_dvt?: string;
  ten_quydoi?: string;
  soluong?: number;
  ma_hh_nhom?: string;
  quycach?: string;
  dongia_ban?: number;
  dongia_goc?: number;
}
export const FukudaSonSanPhamTypeDefault: FukudaSonSanPhamType = {
  id: "",
  ma_hh: "",
};
