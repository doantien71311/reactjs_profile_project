// import Button from "react-bootstrap/Button";
// or less ideally
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faRotate,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { Accordion, Button, Card, Stack } from "react-bootstrap";
import { ButtonGroup } from "react-bootstrap";
import { TCommonToolbar } from "../common_props/CommonToolbarProps";
import { ReactNode, useEffect, useRef } from "react";

export const CommonToolbarUI = ({
  Title,
  Xem,
  Them,
  Sua,
  Xoa,
  children,
}: {
  Title: string;
  Xem: TCommonToolbar;
  Them: TCommonToolbar;
  Sua: TCommonToolbar;
  Xoa: TCommonToolbar;
  children: ReactNode;
}) => {
  const str_variant = "primary";
  const str_size = "sm";
  const str_visible = "visible";
  const str_invisible = "invisible";
  const kiemTraChucNang = (chucnang: TCommonToolbar) => {
    return chucnang.isShowChucnang ? str_visible : str_invisible;
  };

  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      // getArrayData<INhanVienModel>(UrlApi.api_nhanvien_layds).then((value) => {
      //   value.forEach((item) => {
      //     console.log(item.ma_nv ?? "");
      //     console.log(item.ten_nv ?? "");
      //   });
      // });
      return () => console.log(`Cleanup..${initialized.current}`);
    }
  }, []);

  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Card.Header>
          <Stack direction="horizontal">
            <Button>Click me</Button>
            <div className="p-2 ms-auto">{Title}</div>
            <div className="p-2">
              <ButtonGroup aria-label="Basic example">
                <div className={kiemTraChucNang(Xem)}>
                  <Button as="a" variant={str_variant} size={str_size}>
                    <FontAwesomeIcon icon={faRotate} />
                    <div>{Xem.tenChucNang}</div>
                  </Button>
                </div>
                <Button as="a" variant={str_variant} size={str_size}>
                  <FontAwesomeIcon icon={faPlus} />
                  <div>{Them.tenChucNang}</div>
                </Button>{" "}
                <Button as="a" variant={str_variant} size={str_size}>
                  <FontAwesomeIcon icon={faPen} />
                  <div>{Sua.tenChucNang}</div>
                </Button>
                <Button as="a" variant={str_variant} size={str_size}>
                  <FontAwesomeIcon icon={faTrash} />
                  <div>{Xoa.tenChucNang}</div>
                </Button>
              </ButtonGroup>
            </div>
          </Stack>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>{children}</Card.Body>
        </Accordion.Collapse>
      </Card>

      {/* <Accordion.Item eventKey="0">
        <Accordion.Collapse eventKey="0"></Accordion.Collapse>
      </Accordion.Item> */}
    </Accordion>
  );
};
