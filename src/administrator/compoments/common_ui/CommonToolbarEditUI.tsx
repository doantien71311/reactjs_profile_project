// import Button from "react-bootstrap/Button";
// or less ideally
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { Accordion, Button, Card, Stack } from "react-bootstrap";
import { ButtonGroup } from "react-bootstrap";
import { TCommonToolbar } from "../common_props/CommonToolbarProps";
import { useEffect, useRef } from "react";

export const CommonToolbarEditUI = ({
  Title,
  CapNhat,
}: {
  Title: string;
  CapNhat: TCommonToolbar;
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
    <Accordion defaultActiveKey="0" style={{ width: "100%", height: "100%" }}>
      <Card>
        <Card.Header>
          <Stack direction="horizontal" gap={3}>
            <Button>Click me</Button>
            <span className="p-2 text-start text-wrap fw-bold fs-6">
              {Title}
            </span>
            <div className="p-2 ms-auto"></div>
            <div className="p-2 ">
              <ButtonGroup className="" aria-label="Basic example">
                <div className={kiemTraChucNang(CapNhat)}>
                  <Button
                    onClick={CapNhat.onNavigation}
                    as="a"
                    variant={str_variant}
                    size={str_size}
                  >
                    <FontAwesomeIcon icon={faRotate} />
                    <div>{CapNhat.tenChucNang}</div>
                  </Button>
                </div>
              </ButtonGroup>
            </div>
          </Stack>
        </Card.Header>
      </Card>
    </Accordion>
  );
};
