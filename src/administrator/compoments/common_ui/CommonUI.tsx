// import Button from "react-bootstrap/Button";
// or less ideally
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faPlus,
  faTrash,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { ButtonGroup } from "react-bootstrap";

export type TCommonButtonDataGrid = {
  Title: string;
  Icon: IconDefinition;
  OnHandleClick(): void;
  // setChucNang: React.Dispatch<React.SetStateAction<number>>;
};

export const CommonButtonDataGrid = ({
  Title,
  Icon,
  OnClick,
}: {
  Title: string;
  Icon: IconDefinition;
  OnClick(): void;
}) => {
  return (
    <button onClick={OnClick}>
      <FontAwesomeIcon icon={Icon} title={Title} />
    </button>
  );
};

export const CommonButtonAddDataGrid = ({
  OnHandleAddClick,
}: {
  OnHandleAddClick(): void;
}) => {
  return (
    <CommonButtonDataGrid
      Icon={faPlus}
      Title={"Thêm dòng"}
      OnClick={OnHandleAddClick}
    ></CommonButtonDataGrid>
  );
};

export const CommonButtonEditDeleteDataGrid = ({
  OnHandleEditClick,
  OnHandleDeleteClick,
}: {
  OnHandleEditClick(): void;
  OnHandleDeleteClick(): void;
}) => {
  return (
    <ButtonGroup className="">
      <CommonButtonDataGrid
        Icon={faPen}
        Title={"Sửa dòng"}
        OnClick={OnHandleEditClick}
      ></CommonButtonDataGrid>

      <CommonButtonDataGrid
        Icon={faTrash}
        Title={"Xóa dòng"}
        OnClick={OnHandleDeleteClick}
      ></CommonButtonDataGrid>
    </ButtonGroup>
  );
};
