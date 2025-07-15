// import Button from "react-bootstrap/Button";
// or less ideally
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faRotate,
  faPen,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import {
  Accordion,
  AccordionContext,
  Button,
  ButtonToolbar,
  Card,
  Col,
  Form,
  Row,
  Stack,
  useAccordionButton,
} from "react-bootstrap";
import { TCommonToolbar } from "../common_props/CommonToolbarProps";
import { ReactNode, useContext, useEffect, useRef } from "react";
import { BEContext, BEContextProps } from "../BEContext";

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
  const { isCommonLoadingApi } = useContext<BEContextProps>(BEContext);
  //
  const str_variant = "primary";
  const str_size = "sm";
  const str_visible = "visible";
  const str_invisible = "invisible";
  const kiemTraChucNang = (chucnang: TCommonToolbar) => {
    return chucnang.isShowChucnang ? str_visible : str_invisible;
  };

  const initialized = useRef(false);

  function ContextAwareToggle({ eventKey }: { eventKey: string }) {
    const { activeEventKey } = useContext(AccordionContext);

    // const decoratedOnClick = useAccordionButton(
    //   eventKey,
    //   () => callback && callback(eventKey)
    // );

    const decoratedOnClick = useAccordionButton(eventKey, () => {});

    const isCurrentEventKey = activeEventKey === eventKey;

    return (
      <Button type="button" variant="link" onClick={decoratedOnClick}>
        {isCurrentEventKey ? (
          <FontAwesomeIcon icon={faChevronUp} />
        ) : (
          <FontAwesomeIcon icon={faChevronDown} />
        )}
      </Button>
    );
  }

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    return () =>
      console.log(
        `CommonToolbarUI useEffect clear up ${isCommonLoadingApi.toString()}`
      );
  }, []);

  return (
    <Accordion defaultActiveKey="0" style={{ width: "100%" }}>
      <Card>
        <Card.Header className="row_body_toolbar_top_accordion_car_header">
          <Row className="align-items-center">
            <Stack
              as={Col}
              sm={12}
              // className="col-md-auto"
              md={6}
              direction="horizontal"
              gap={1}
            >
              <ContextAwareToggle eventKey="0"></ContextAwareToggle>
              <Form.Label className="p-0 text-start text-primary text-wrap fw-bold fs-6">
                {Title}
              </Form.Label>
            </Stack>

            {/* <Col sm={11} className="col-md-auto"></Col> */}

            <Col sm={12} md={6} className="d-flex">
              <ButtonToolbar
                aria-label="Basic example"
                style={{ marginLeft: "auto", marginRight: "0px" }}
              >
                <div className={kiemTraChucNang(Xem)}>
                  <Button
                    onClick={Xem.onNavigation}
                    as="a"
                    variant={str_variant}
                    size={str_size}
                    className="me-1"
                  >
                    <FontAwesomeIcon className="px-1" icon={faRotate} />
                    <span>{Xem.tenChucNang}</span>
                  </Button>

                  <Button
                    onClick={Them.onNavigation}
                    as="a"
                    variant={str_variant}
                    size={str_size}
                    className="me-1"
                  >
                    <FontAwesomeIcon icon={faPlus} className="px-1" />
                    <span>{Them.tenChucNang}</span>
                  </Button>

                  <Button
                    onClick={Sua.onNavigation}
                    as="a"
                    variant={str_variant}
                    size={str_size}
                    className="me-1"
                  >
                    <FontAwesomeIcon icon={faPen} className="px-1" />
                    <span>{Sua.tenChucNang}</span>
                  </Button>

                  <Button
                    as="a"
                    variant={str_variant}
                    size={str_size}
                    className="me-1"
                  >
                    <FontAwesomeIcon icon={faTrash} className="px-1" />
                    <span>{Xoa.tenChucNang}</span>
                  </Button>
                </div>
              </ButtonToolbar>
            </Col>

            {/* </div> */}
          </Row>
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
