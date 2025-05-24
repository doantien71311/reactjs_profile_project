import { useState, createContext, ReactNode, useEffect, useRef } from "react";
//
export type BEContextProps = {
  isShowMenu: boolean;
  setIsShowMenu: (value: boolean) => void;
};
export const BEContext = createContext<BEContextProps>({
  isShowMenu: true,
  setIsShowMenu: () => {},
});

export const BEProvider = ({ children }: { children: ReactNode }) => {
  const initialized = useRef(false);

  const [useIsShowMenu, setUseIsShowMenu] = useState<boolean>(true);

  const updateUseIsShowMenu = (newValue: boolean) => {
    setUseIsShowMenu(newValue);
  };

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = false;

    return () => {
      console.log("BEProvider: useEffect - count - cleanup");
    };
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = false;
    console.log("useIsShowMenu :" + useIsShowMenu.toString());
    return () => {};
  }, [useIsShowMenu]);

  return (
    <BEContext.Provider
      value={{
        isShowMenu: useIsShowMenu,
        setIsShowMenu: updateUseIsShowMenu,
      }}
    >
      {children}
    </BEContext.Provider>
  );
};
