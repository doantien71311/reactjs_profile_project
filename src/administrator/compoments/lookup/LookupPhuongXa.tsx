import { useEffect, useMemo, useRef, useState, startTransition } from "react";
import { Button, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { getArrayDataPromise } from "../../../services/HttpServices";
import UrlApi from "../../../services/UrlApi";
import { CellSelectArgs, DataGrid, DataGridHandle } from "react-data-grid";
import BEConstCSS from "../BEConstCSS";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
  faDownload,
  faRotate,
} from "@fortawesome/free-solid-svg-icons";
import { ParameterApiType } from "../../../model/ParameterApiType";
import { DsPhuongXaType } from "../../../model/DsPhuongXaType";
import LookupStatus from "./LookupStatus";
import { LookupLoading } from "./LookupLoading";

export const LookupPhuongXa = ({
  isShow,
  setShow,
  tranferData,
  maTinhThanhPho,
  maQuanHuyen,
}: {
  isShow: boolean;
  setShow: (value: boolean) => void;
  tranferData: (item: DsPhuongXaType) => void;
  maTinhThanhPho: string;
  maQuanHuyen: string;
}) => {
  const [showKyNang, setShowKyNang] = useState(false);
  const handleKyNangClose = () => setShowKyNang(false);
  const [dataApi, setDataApi] = useState<DsPhuongXaType[]>([]);
  const [selectRow, setSelectRow] = useState<DsPhuongXaType>({});
  const [textSearch, setTextSearch] = useState("");
  const [textInput, setTextInput] = useState("");
  const [status, setStatus] = useState("");

  //
  const onExitedChange = (node: HTMLElement) => {
    if (node == null) return;
    handleKyNangClose();
    setShow(false);
  };

  async function fetchData() {
    setStatus(LookupStatus.loading);
    const parameter: ParameterApiType[] = [];
    parameter.push({ name: "ma_tinhthanhpho", value: maTinhThanhPho });
    parameter.push({ name: "ma_quanhuyen", value: maQuanHuyen });
    const data = await getArrayDataPromise<DsPhuongXaType>(
      `${UrlApi.api_danh_muc_phuong_xa_lay_ds}`,
      parameter
    );
    setDataApi(data);
    setStatus(LookupStatus.loaded);
  }
  const filterData = useMemo<DsPhuongXaType[]>(() => {
    const dataFilter = [...dataApi].filter(
      (f) =>
        (f.ma_phuongxa ?? "")
          .toLowerCase()
          .includes(textSearch.toLowerCase()) ||
        (f.ten_phuongxa ?? "").toLowerCase().includes(textSearch.toLowerCase())
    );

    return dataFilter;
  }, [dataApi, isShow, textSearch]);

  useEffect(() => {
    setShowKyNang(isShow);
    if (isShow) {
      fetchData();
      handleClickClearText();
    }
  }, [isShow, maTinhThanhPho, maQuanHuyen]);
  //
  const gridRef = useRef<DataGridHandle>(null);
  const columns = [
    {
      key: "SELECT_COLUMN_KEY",
      name: "",
      width: 80,
      minWidth: 80,
      maxWidth: 80,
      resizable: true,
    },
    {
      key: "ma_phuongxa",
      name: "Mã phường xã",
      width: "minmax(300px, max-content)",
      //   width: "max-content",
      //   minWidth: 200,
      // maxWidth: 100,
    },
    {
      key: "ten_phuongxa",
      name: "Tên phường xã",
      width: "minmax(300px, max-content)",
      //   width: "max-content",
      //   minWidth: 200,
      // maxWidth: 100,
    },
    {
      key: "ma_quanhuyen",
      name: "Mã quận huyện",
      width: "minmax(300px, max-content)",
      //   width: "max-content",
      //   minWidth: 200,
      // maxWidth: 100,
    },
    {
      key: "ten_quanhuyen",
      name: "Tên quận huyện",
      width: "minmax(300px, max-content)",
      //   width: "max-content",
      //   minWidth: 200,
      // maxWidth: 100,
    },
    {
      key: "ma_tinhthanhpho",
      name: "Mã tỉnh thành phố",
      width: "minmax(300px, max-content)",
      //   width: "max-content",
      //   minWidth: 200,
      // maxWidth: 100,
    },
    {
      key: "ten_tinhthanhpho",
      name: "Tên tỉnh thành phố",
      width: "minmax(300px, max-content)",
      //   width: "max-content",
      //   minWidth: 200,
      // maxWidth: 100,
    },
  ];

  function onSelectedCellChange(args: CellSelectArgs<DsPhuongXaType>) {
    if (!args.row) return;
    setSelectRow(args.row);
  }

  function onCellDoubleClick(args: CellSelectArgs<DsPhuongXaType>) {
    if (!args.row) return;
    setSelectRow(args.row);
    handleClickGetData();
  }
  const handleTextSearchChange = (value: string) => {
    setTextInput(value);
    startTransition(() => {
      setTextSearch(value);
    });

    // setTextSearch(value);
  };

  const handleClickGetData = () => {
    handleKyNangClose();
    setShow(false);
    tranferData(selectRow);
  };

  const handleClickClearText = () => {
    setTextInput("");
    startTransition(() => {
      setTextSearch("");
    });
  };

  const handleClickRefesh = async () => {
    handleClickClearText();
    await fetchData();
  };

  return (
    <>
      <Modal
        show={showKyNang}
        onHide={handleKyNangClose}
        onExited={onExitedChange}
        size="lg"
      >
        <Modal.Header closeButton>
          <Row>
            <Modal.Title>Danh sách Phường/Xã</Modal.Title>
          </Row>
          <Row></Row>
        </Modal.Header>
        <Modal.Body>
          <Form className="mb-2">
            <Form.Group>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Tìm kiếm...."
                  value={textInput}
                  onChange={(event) =>
                    handleTextSearchChange(event.target.value)
                  }
                ></Form.Control>
                <Button onClick={handleClickClearText}>
                  <FontAwesomeIcon icon={faDeleteLeft} />
                </Button>
                <Button onClick={handleClickGetData}>
                  <FontAwesomeIcon icon={faDownload} />
                </Button>
                <Button onClick={() => handleClickRefesh()}>
                  <FontAwesomeIcon icon={faRotate} />
                </Button>
              </InputGroup>
            </Form.Group>
          </Form>
          <DataGrid
            className={`${BEConstCSS.rdg_light} ${BEConstCSS.grid_lookup_preview}`}
            ref={gridRef}
            columns={columns}
            rows={filterData}
            onSelectedCellChange={onSelectedCellChange}
            onCellDoubleClick={onCellDoubleClick}
            defaultColumnOptions={{
              minWidth: 50,
              resizable: true,
              sortable: true,
              draggable: true,
            }}
          ></DataGrid>
          {status == LookupStatus.loading ? <LookupLoading /> : <></>}
        </Modal.Body>
      </Modal>
    </>
  );
};
