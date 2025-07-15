import { useContext, useMemo, useState, useTransition } from "react";
import { FukudaSonSanPhamType } from "../../../model/FukudaSonSanPhamType";
// import {} from "react-data-grid";
import {
  FukudaSonSanPhamBEContext,
  FukudaSonSanPhamBEContextProps,
} from "./FukudaSonSanPhamBEContext";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Row,
  Spinner,
  Stack,
} from "react-bootstrap";
import { ItemGrid } from "./ItemGrid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

export const Grid = () => {
  const { dataApi, textFilterNhomSon, textSort } =
    useContext<FukudaSonSanPhamBEContextProps>(FukudaSonSanPhamBEContext);
  const [isPending, startTransition] = useTransition();

  const [textSearch, setTextSearch] = useState("");
  const [textInput, setTextInput] = useState("");
  const filterData = useMemo<FukudaSonSanPhamType[]>(() => {
    //return startTransition(() => {

    const dataFilter = [...dataApi]
      .filter((f) => f.ten_hh?.toLowerCase().includes(textSearch.toLowerCase()))
      .filter((f) => {
        if (textFilterNhomSon == "") return true;
        else {
          return f.ma_hh_nhom == textFilterNhomSon;
        }
      });

    const dataSort = dataFilter.sort((a, b) => {
      if (textSort === "GIA_TANG") {
        if ((a.dongia_ban ?? 0) < (b.dongia_ban ?? 0)) {
          return -1;
        }
        return 1;
      }
      if (textSort === "GIA_GIAM") {
        if ((a.dongia_ban ?? 0) > (b.dongia_ban ?? 0)) {
          return -1;
        } else {
          return 1;
        }
      }
      return 0;

      // return 0;
      // if (textSort === "GIA_TANG") {
      //   return b.ma_hh.localeCompare(a.ma_hh);
      // } else {
      //   return a.ma_hh.localeCompare(b.ma_hh);
      // }
    });

    // console.log(dataSort);

    return dataSort;
    //});
  }, [dataApi, textSearch, textFilterNhomSon, textSort]);

  // useEffect(() => {
  //   setTextSearch("");
  // }, []);

  const handleTextSearchChange = (value: string) => {
    setTextInput(value);
    startTransition(() => {
      setTextSearch(value);
    });

    // setTextSearch(value);
  };

  return (
    <Container fluid className="list_container_fill">
      <Row className="m-2 w-95 align-items-center search_row_fill">
        <Stack as={Col} sx={12} md={6} lg={9}>
          <Form.Label className="text-secondary fst-italic">
            Tổng số {dataApi.length} sản phẩm
          </Form.Label>
        </Stack>
        <Stack as={Col} sx={12} md={6} lg={3} direction="horizontal" gap={1}>
          <FormControl
            type="text"
            placeholder="Tìm kiếm...."
            value={textInput}
            onChange={(event) => handleTextSearchChange(event.target.value)}
          ></FormControl>
          <Button
            variant="secondary"
            className="me-1"
            onClick={() => handleTextSearchChange("")}
          >
            <FontAwesomeIcon icon={faDeleteLeft} />
          </Button>
        </Stack>
      </Row>
      {isPending ? (
        <Spinner animation="border" variant="info" className="me-auto" />
      ) : (
        <Row className="m-2 w-100 overflow-auto list_row_fill">
          {filterData.map((item) => (
            <Col
              className="mt-2 mb-2"
              // style={{ maxWidth: "350px" }}
              xs={12}
              md={6}
              lg={4}
              xl={3}
              xxl={2}
              key={(item.id ?? "col") + "-col"}
            >
              <ItemGrid item={item} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};
