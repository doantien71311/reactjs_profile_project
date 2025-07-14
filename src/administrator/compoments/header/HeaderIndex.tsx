import { faBars, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef } from "react";

import {
  Button,
  Dropdown,
  DropdownButton,
  Stack,
  Image,
} from "react-bootstrap";
import { BEContextProps, BEContext } from "../BEContext";

export const HeaderIndex = () => {
  const { isShowMenu, setIsShowMenu } = useContext<BEContextProps>(BEContext);
  const initialized = useRef(false);
  //

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
    }
    return () => {
      //ComponentWillUnmount (Hủy bỏ)
      //clean up function
      console.log("Header UseEffect - count - cleanup");
    };
  }, []);

  //#region các hàm private
  const menuHandleClick = () => {
    setIsShowMenu(!isShowMenu);
  };

  //#endregion các hàm private

  return (
    <>
      <Stack
        direction="horizontal"
        style={{ width: "100%", height: "100%", maxHeight: "60px" }}
        gap={3}
      >
        <div className="p-2 ">
          <Button onClick={() => menuHandleClick()}>
            <FontAwesomeIcon icon={faBars} />
          </Button>
        </div>
        <span className="text-left text-secondary fw-bold">
          Web portal demo, chưa hoàn chỉnh, xin thông cảm
        </span>
        <div className="p-2 ms-auto "></div>
        <div className="p-2">
          <DropdownButton
            variant=""
            // as={ButtonGroup}
            title={
              <Image
                src="https://lh3.googleusercontent.com/d/1WCCmFDcmtXyNiUGg7uxfooR2tbOnHa2r"
                style={{
                  width: "100%",
                  height: "100%",
                  maxHeight: "45px",
                  maxWidth: "45px",
                  boxShadow: "1px 1px 2px grey",
                  border: "1px solid white",
                }}
                roundedCircle
              />
            }
            // aria-hidden="true"
            // id="bg-nested-dropdown"
          >
            {/* <Dropdown.Divider /> */}
            <Dropdown.Item eventKey="1">ADMIN</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="1">Administrator</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="1">Đổi Them</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="2">
              <Button onClick={() => menuHandleClick()}>
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Đăng xuất</span>
              </Button>
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </Stack>
    </>
  );
};
