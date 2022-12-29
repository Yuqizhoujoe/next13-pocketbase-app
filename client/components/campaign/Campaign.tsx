import Button from "../Common/Button/Button";
import Card from "../Common/Card/Card";
import { CampaignInterface } from "../../../shared/modal/data/interface";
import { useRouter } from "next/router";
import { useSelect } from "@mui/base";
import { useEffect } from "react";

const Campaign = ({ campaign }: { campaign: CampaignInterface }) => {
  const router = useRouter();

  const viewCampaignNFTs = async () => {
    const url = `/nfts/campaign/${campaign.id}`;
    await router.prefetch(url);
    await router.push(url);
  };

  const editCampaign = async () => {
    const url = `/campaigns/create?campaignId=${campaign.id}`;
    await router.prefetch(url);
    await router.push(url);
  };

  return (
    <div className="campaign_component grid grid-cols-2 gap-2">
      <div className="col-start-1 col-end-3">
        <Card
          cardDivCss="card flex justify-between flex-row p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
          label="Campaign ID"
          description={campaign.id}
          renderActionItem={() => {
            return (
              <Button
                btnDivClassName="card_action relative z-0 mt-5 group"
                btnClassName="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 focus:ring-4 focus:outline-none focus:ring-red-100"
                label="View Campaign NFTs"
                type="button"
                handleClick={viewCampaignNFTs}
              />
            );
          }}
        />
      </div>
      <div>
        <Card label="Campaign Address" description={campaign.campaignAddress} />
      </div>
      <div>
        <Card label="Campaign Name" description={campaign.campaignName} />
      </div>
      <div>
        <Card
          label="No. NFTs"
          description={campaign.nfts ? campaign.nfts.length : 0}
        />
      </div>
      <div className="col-span-2">
        <Button
          btnDivClassName="card_action relative z-0 mt-5 group"
          btnClassName="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 focus:ring-4 focus:outline-none focus:ring-red-100"
          label="Edit Campaign"
          type="button"
          handleClick={editCampaign}
        />
      </div>
    </div>
  );
};

export default Campaign;
