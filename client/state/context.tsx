import { createContext, useContext } from "react";
import { LayoutInterface } from "../../shared/modal/Common/interface";

const AppContext = createContext<any | null>(null);

export const AppContextWrapper = ({ children }: LayoutInterface) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
