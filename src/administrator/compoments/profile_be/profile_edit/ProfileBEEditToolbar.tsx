import { useContext } from "react";
import { TCommonToolbar } from "../../common_props/CommonToolbarProps";
import { CommonToolbarEditUI } from "../../common_ui/CommonToolbarEditUI";
import {
  ProfileBEEditContext,
  ProfileBEEditContextProps,
} from "./ProfileBEEditContext";
import { Form, Modal } from "react-bootstrap";

export const ProfileBEEditToolbar = () => {
  // const postDataApi =
  //   useContext<ProfileBEEditContextProps>(ProfileBEEditContext).postDataApi;
  const isLoadingApi =
    useContext<ProfileBEEditContextProps>(ProfileBEEditContext).isLoadingApi;

  const fetchDataApi =
    useContext<ProfileBEEditContextProps>(ProfileBEEditContext).fetchDataApi;

  const isUseUpdatingApi =
    useContext<ProfileBEEditContextProps>(
      ProfileBEEditContext
    ).isUseUpdatingApi;

  // const _postDataApi = async () => postDataApi();

  const CapNhat: TCommonToolbar = {
    maChucNang: "CapNhat",
    tenChucNang: "Lưu",
    isChucNang: false,
    isShowChucnang: true,
    onNavigation: () => {
      // _postDataApi().then((value) => {
      //   console.log(value);
      //   fetchDataApi();
      // });

      fetchDataApi();
    },
  };

  return (
    <>
      <Modal show={isUseUpdatingApi || isLoadingApi}>
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>
              {isUseUpdatingApi ? "Đang lưu dữ liệu..." : ""}
            </Form.Label>
            <Form.Label>{isLoadingApi ? "Đang tải dữ liệu..." : ""}</Form.Label>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <CommonToolbarEditUI
        Title="Cập nhật Profile"
        CapNhat={CapNhat}
      ></CommonToolbarEditUI>
    </>
  );
};
