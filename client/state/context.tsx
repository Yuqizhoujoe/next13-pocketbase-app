import { createContext, useContext, useState } from "react";
import { LayoutInterface } from "../../shared/modal/Common/interface";
import { CampaignInterface } from "../../shared/modal/data/interface";

const AppContext = createContext<any | null>(null);

export const AppContextWrapper = ({ children }: LayoutInterface) => {
  const [campaigns, setCampaigns] = useState<CampaignInterface[]>([]);

  const cacheCampaigns = (campaigns: CampaignInterface[]) => {
    setCampaigns(campaigns);
  };

  return (
    <AppContext.Provider
      value={{
        campaigns,
        cacheCampaigns,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext(): {
  campaigns: CampaignInterface[];
  cacheCampaigns: () => any;
} {
  return useContext(AppContext);
}
