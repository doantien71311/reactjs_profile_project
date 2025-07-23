import { CommonTitleBodyEditUI } from "../common_ui/CommonTitleBodyEditUI";
import { EditProvider } from "./Context";
import { FormEdit } from "./FormEdit";
import { ToolbarEdit } from "./ToolbarEdit";

export const NhanVienEditIndex = () => {
  return (
    <>
      <EditProvider>
        <CommonTitleBodyEditUI
          title={<ToolbarEdit />}
          body={<FormEdit />}
        ></CommonTitleBodyEditUI>
      </EditProvider>
    </>
  );
};
