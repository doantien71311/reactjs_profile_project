import { FormEvent, useEffect, useState } from "react";
import { Button, Col, Form, Spinner, Stack, Image } from "react-bootstrap";
import { RequestDangNhapType } from "../../../model/RequestDangNhapType";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import SessionStorageKey from "../../SessionStorageKey";
// import NodeRSA from "encrypt-rsa";

export const DangNhapIndex = () => {
  const [validated, setValidated] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const submit_loading = "submit_loading";
  const submit_complete = "submit_complete";
  // const submit_fail = "submit_fail";
  const navigate = useNavigate();

  const [dataApi, setDataApi] = useState<RequestDangNhapType>({
    ma_nsd: "",
    mat_khau_giai_ma: "",
    mat_khau: "",
  });

  const handleChangeMaNSD = (value: string) => {
    setDataApi({ ...dataApi, ma_nsd: value });
  };
  const handleChangeMatKhau = (value: string) => {
    setDataApi({ ...dataApi, mat_khau_giai_ma: value });
  };

  const handleSubmit = async (
    // event: React.DOMAttributes<HTMLFormElement> | undefined
    // event: React.ChangeEvent<HTMLInputElement>
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    console.log("form.checkValidity(): " + form.checkValidity());
    setValidated(true);
    if (form.checkValidity() === false) {
      // event.preventDefault();
      event.stopPropagation();
      return;
    }

    //console.log(dataApi);
    await fetchDataApi();

    // setTimeout(() => {
    //   setSubmitStatus(submit_complete);
    // }, 5000);
  };

  useEffect(() => {
    if (submitStatus === submit_complete)
      //Chuyển đến trang chủ, index
      navigate("/");
  }, [submitStatus]);

  const fetchDataApi = async () => {
    //Kết nối server kiểm tra tài khoản đăng nhập
    setSubmitStatus(submit_loading);
    console.log(dataApi);
    //
    setTimeout(() => {
      sessionStorage.setItem(SessionStorageKey.username, dataApi.ma_nsd);
      sessionStorage.setItem(
        SessionStorageKey.password,
        dataApi.mat_khau_giai_ma
      );
      sessionStorage.setItem(SessionStorageKey.token, "asdasdasdas");
      setSubmitStatus(submit_complete);
    }, 10000);
  };

  return (
    <>
      <div
        style={{
          border: "1px solid green",
          width: "100vw",
          height: "100vh",
          position: "relative",
        }}
      >
        {/* <Image src="https://lh3.googleusercontent.com/d/1Ky_DrUVX-Uo3J-Wls7juRKqzLSFbuRKU"></Image> */}

        <Image
          src="https://doantien71311.github.io/web-video/IconAppDevelopeBanner.png"
          fluid
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            filter: "blur(3px)",
            objectFit: "cover",
          }}
        ></Image>

        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="m-0 bg-light"
          style={{
            // border: "1px solid red",
            boxShadow: "0px 0px 3px 1px",
            borderRadius: "10px",
            // margin: "200px auto auto auto",
            maxWidth: "500px",
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%) translateX(-50%)",
            left: "50%",
          }}
        >
          <Form.Group as={Col} sm={12} md={11} className="m-3">
            <Form.Label>Tài khoản:</Form.Label>

            <Form.Control
              placeholder="TEST"
              required
              type="text"
              value={dataApi.ma_nsd}
              onChange={(event) => handleChangeMaNSD(event.target.value)}
            ></Form.Control>

            <Form.Control.Feedback type="invalid">
              Tài khoản không được trống
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} sm={12} md={11} className="m-3">
            <Form.Label>Mật khẩu:</Form.Label>
            <Form.Control
              placeholder="123"
              required
              type="password"
              value={dataApi.mat_khau_giai_ma}
              onChange={(event) => handleChangeMatKhau(event.target.value)}
            ></Form.Control>

            {/* <InputGroup>
              <FontAwesomeIcon icon={faRightToBracket} />
              <Form.Control
                placeholder="123"
                required
                type="password"
                value={dataApi.mat_khau_giai_ma}
                onChange={(event) => handleChangeMatKhau(event.target.value)}
              ></Form.Control>
            </InputGroup> */}

            <Form.Control.Feedback type="invalid">
              Mật khẩu không được trống
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md={12} className="m-3">
            <Button
              type="submit"
              disabled={submitStatus == submit_loading ? true : false}
            >
              <Stack direction="horizontal" gap={2}>
                {submitStatus === submit_loading ? (
                  <>
                    <Spinner animation="border" variant="light" size="sm" />
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faRightToBracket} />
                    {/* <FontAwesomeIcon icon={faSignOutAlt} /> */}
                  </>
                )}

                <span>Đăng nhập</span>
              </Stack>
            </Button>
          </Form.Group>
        </Form>
      </div>
    </>
  );
};
