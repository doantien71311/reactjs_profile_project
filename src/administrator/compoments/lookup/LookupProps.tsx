export type LookupProps = {
  isShow: boolean;
  setShow: (value: boolean) => void;
  tranferData: <T>(item: T) => void;
};
