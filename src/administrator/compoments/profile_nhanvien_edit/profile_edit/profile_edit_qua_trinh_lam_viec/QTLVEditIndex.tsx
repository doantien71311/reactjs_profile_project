import { CommonTitleBodyEditUI } from "../../../common_ui/CommonTitleBodyEditUI";
import { QTLVEditProvider } from "./QTLVEditContext";
import { QTLVEditForm } from "./QTLVEditForm";
import { QTLVEditToolbar } from "./QTLVEditToolbar";

export const QTLVEditIndex = () => {
  return (
    <>
      <QTLVEditProvider>
        <CommonTitleBodyEditUI
          title={<QTLVEditToolbar />}
          body={<QTLVEditForm />}
        ></CommonTitleBodyEditUI>
      </QTLVEditProvider>
    </>
  );
};
