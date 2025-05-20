import { CommonTitleBodyUI } from "../common_ui/CommonTitleBodyUI";
import { NhanVienToolbar } from "./NhanVienToolbar";
import { NhanVienGrid } from "./NhanVienGrid";
import { NhanVienProvider } from "./NhanVienContext";

export const NhanVienIndex = () => {
  return (
    <>
      <NhanVienProvider>
        <CommonTitleBodyUI
          title={<NhanVienToolbar></NhanVienToolbar>}
          body={<NhanVienGrid></NhanVienGrid>}
        ></CommonTitleBodyUI>
      </NhanVienProvider>
    </>
  );
};
