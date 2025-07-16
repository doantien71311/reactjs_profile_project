class ChucNangUrl {
  static toUrlDanhMuc = (url: string, keyString: string, isAddNew: boolean) => {
    return url + "/" + keyString + "/" + isAddNew;
  };
  static toQueryDanhMuc = "/:keyString/:isAddNew";
  ///
  static administrator_nhanvien = "administrator/nhanvien";
  ///
  static administrator_profile = "administrator/profile";
  static administrator_profile_edit = "/administrator/profile-edit";
  //
  static administrator_fukuda_son_dondathang =
    "/administrator/fukuda-son-dondathang";
  //
  static administrator_fukuda_son_sanpham = "/administrator/fukuda-son-sanpham";
  static administrator_fukuda_son_sanpham_edit =
    "/administrator/fukuda-son-sanpham-edit";
  //
  static administrator_fukuda_son_tuyendung_npp =
    "/administrator/fukuda-son-tuyendung-npp";
  static administrator_fukuda_son_khao_sat =
    "/administrator/fukuda-son-khao-sat";
}
export default ChucNangUrl;
