import CreateEditNFT from "../../client/components/nft/CreateEditNFT";
import { GetServerSidePropsContext } from "next";
import _ from "lodash";
import { fetchCampaignById } from "../../server/pb/query/campaigns";
import { parseJSONAPIObject } from "../../lib/helper";
import { CampaignInterface } from "../../shared/modal/data/interface";
import { useEffect } from "react";

export default function createNFT({
  campaign,
}: {
  campaign: CampaignInterface;
}) {
  return (
    <div className="create_nft_container w-full h-screen">
      <CreateEditNFT campaign={campaign} />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const campaignId = _.get(context, "query.campaignId", "");
  const campaignResponse = await fetchCampaignById(campaignId, "nfts");
  const campaign = parseJSONAPIObject(campaignResponse);

  return {
    props: {
      campaign,
    },
  };
}
