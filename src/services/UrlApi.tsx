class UrlApi {
  static getApiHttp = () => {
    return import.meta.env.VITE_api_http;
  };
  static getApiUsername = () => {
    return import.meta.env.VITE_api_username;
  };
  static getApiPassword = () => {
    return import.meta.env.VITE_api_password;
  };
  // static api_http: string = "https://nodejs-app-publish-project.onrender.com";
  static api_auth_token: string = "/api/auth-token";

  // static username: string = "B8BAC6B049709B134AB4B54F57D9E1C0DB068E91091B1047";
  // static password: string = "6CC0BCCBEA7D5E8F678F14FC5400E251";

  static api_fukuda_son_san_pham_lay_ds: string =
    "/api/fukuda-son-san-pham-lay-ds";
  static api_fukuda_son_san_pham_cap_nhat: string =
    "/api/fukuda-son-san-pham-cap_nhat";

  //
  static api_profile_nhan_vien_lay_ds: string = "/api/profile-nhan-vien-lay-ds";
  static api_profile_nhan_vien_cap_nhat: string =
    "/api/profile-nhan-vien-cap-nhat";
  //

  static api_he_thong_chuc_nang_lay_ds: string =
    "/api/he-thong-chuc-nang-lay-ds";

  static api_danh_muc_nhan_vien_lay_ds: string =
    "/api/danh-muc-nhan-vien-lay-ds";
  static api_danh_muc_nhan_vien_cap_nhat: string =
    "/api/danh-muc-nhan-vien-cap-nhat";

  //
  static api_image_upload_anh_dai_dien: string =
    "/api/image-upload-anh-dai-dien";
  //
  static api_danh_muc_tinh_thanh_pho_lay_ds: string =
    "/api/danh-muc-tinh-thanh-pho-lay-ds";
  //
  static api_danh_muc_quan_huyen_lay_ds: string =
    "/api/danh-muc-quan-huyen-lay-ds";
  static api_danh_muc_phuong_xa_lay_ds: string =
    "/api/danh-muc-phuong-xa-lay-ds";
}
export default UrlApi;
