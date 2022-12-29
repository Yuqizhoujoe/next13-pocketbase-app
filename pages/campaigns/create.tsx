import CreateEditCampaign from "../../client/components/campaign/CreateCampaign";
import { GetServerSidePropsContext } from "next";
import _ from "lodash";
import { fetchCampaignById } from "../../server/pb/query/campaigns";
import { parseJSONAPIObject } from "../../lib/helper";
import { CampaignInterface } from "../../shared/modal/data/interface";

export default function create({ campaign }: { campaign: CampaignInterface }) {
  return (
    <div className="create_campaign_container w-full h-screen">
      <CreateEditCampaign campaign={campaign} />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const campaignId = _.get(context, "query.campaignId", "");
  const campaignResponse = await fetchCampaignById(campaignId);
  const campaign = parseJSONAPIObject(campaignResponse);
  return {
    props: {
      campaign,
    },
  };
}
