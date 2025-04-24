import { ReactNode } from "react";

export type CommonContextProps<T> = {
  parameterSearch: CommonParameterProps;
  setParameterSearch: (value: CommonParameterProps) => void;
  isLoadingApi: boolean;
  setIsLoadingApi: (value: boolean) => void;
  dataApi: T[];
  setDataApi: (value: T[]) => void;
  selectRow: T;
  setSelectRow: (value: T) => void;
  fetchDataApi: () => void;
};

export type CommonParameterProps = {
  tungay: Date;
  denngay: Date;
  thoigian: string;
  tinhtrang: string;
};

export const CommonParamaterPropsDefault: CommonParameterProps = {
  tungay: new Date(),
  denngay: new Date(),
  thoigian: "",
  tinhtrang: "",
};

export type CommonChildrenProps = { children: ReactNode };
