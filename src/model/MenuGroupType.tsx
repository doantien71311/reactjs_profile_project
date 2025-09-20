export type MenuGroupType = {
  ma_menu_group: string;
  ten_menu_group: string;
};

export const MenuGroupTypeList = () => {
  const result: MenuGroupType[] = [];
  result.push({ ma_menu_group: "ONE", ten_menu_group: "Nhóm" });
  result.push({ ma_menu_group: "TWO", ten_menu_group: "Danh sách" });
  return result;
};
