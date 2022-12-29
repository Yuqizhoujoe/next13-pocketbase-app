import { GetServerSidePropsContext } from "next";
import { fetchCampaignById } from "../../../server/pb/query/campaigns";
import _ from "lodash";
import { parseJSONAPIObject } from "../../../lib/helper";
import { CampaignInterface } from "../../../shared/modal/data/interface";
import { useEffect } from "react";
import Campaign from "../../../client/components/campaign/Campaign";

export default function CampaignContainer({
  campaign,
}: {
  campaign: CampaignInterface;
}) {
  useEffect(() => {
    console.log(campaign);
  }, []);

  return (
    <div className="campaign_container h-screen">
      <Campaign campaign={campaign} />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log(context);
  const campaignId = _.get(context, "query.id", "");
  const response = await fetchCampaignById(campaignId);
  const campaign = parseJSONAPIObject(response);

  return {
    props: {
      campaign,
    },
  };
}
