export type ChucVuType = {
  ma_chucvu: string;
  ten_chucvu: string;
};

export const ChucVuTypeList = () => {
  const result: ChucVuType[] = [];
  result.push({ ma_chucvu: "CTV", ten_chucvu: "CỘNG TÁC VIÊN" });
  result.push({ ma_chucvu: "AG", ten_chucvu: "CHUYÊN VIÊN TƯ VẤN" });
  result.push({ ma_chucvu: "AM", ten_chucvu: "TRƯỞNG KHU VỰC KINH DOANH" });
  result.push({ ma_chucvu: "AZD", ten_chucvu: "GIÁM ĐỐC KINH DOANH" });
  result.push({ ma_chucvu: "RD", ten_chucvu: "GIÁM ĐỐC VÙNG" });
  result.push({ ma_chucvu: "TNKD", ten_chucvu: "TRƯỞNG NHÓM KINH DOANH" });
  return result;
};
