export type NhomHangSanPhamType = {
  ma_nhom_hh: string;
  ten_nhom_hh: string;
};

export const NhomHangSanPhamTypeList = () => {
  const result: NhomHangSanPhamType[] = [];
  result.push({ ma_nhom_hh: "CHONGTHAM", ten_nhom_hh: "Chống thấm" });
  result.push({ ma_nhom_hh: "SON_NOITHAT", ten_nhom_hh: "Sơn nội thất" });
  result.push({ ma_nhom_hh: "SON_NGOAITHAT", ten_nhom_hh: "Sơn ngoại thất" });
  result.push({
    ma_nhom_hh: "SON_LOTKHANGKIEM",
    ten_nhom_hh: "Sơn lót kháng kiềm",
  });
  result.push({ ma_nhom_hh: "BOBA", ten_nhom_hh: "Bột bã" });
  return result;
};
