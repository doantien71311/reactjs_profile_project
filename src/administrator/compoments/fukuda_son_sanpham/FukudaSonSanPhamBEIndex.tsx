import { CommonTitleBodyUI } from "../common_ui/CommonTitleBodyUI";
import { Toolbar } from "./Toolbar";
import { Grid } from "./Grid";
import { FukudaSonSanPhamBEProvider } from "./FukudaSonSanPhamBEContext";

export const FukudaSonSanPhamBEIndex = () => {
  return (
    <>
      <FukudaSonSanPhamBEProvider>
        <CommonTitleBodyUI
          title={<Toolbar></Toolbar>}
          body={<Grid></Grid>}
        ></CommonTitleBodyUI>
      </FukudaSonSanPhamBEProvider>
    </>
  );
};
