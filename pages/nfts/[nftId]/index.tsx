import { GetServerSidePropsContext } from "next";
import _ from "lodash";
import { fetchNFTById } from "../../../server/pb/query/nfts";
import { parseJSONAPIObject } from "../../../lib/helper";
import { useEffect } from "react";
import {
  CampaignInterface,
  NFTInterface,
} from "../../../shared/modal/data/interface";
import CreateEditNFT from "../../../client/components/nft/CreateEditNFT";

export default function NFTContainer({
  nft,
  campaign,
}: {
  nft: NFTInterface;
  campaign: CampaignInterface;
}) {
  return (
    <div className="nft_container w-full h-fit">
      <CreateEditNFT nft={nft} campaign={campaign} />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const nftId = _.get(context, "query.nftId", "");
  const nftResponse = await fetchNFTById(nftId, "campaign");
  const nft = parseJSONAPIObject(nftResponse);
  const campaign = _.get(nft, "expand.campaign", {});

  return {
    props: {
      nft,
      campaign,
    },
  };
}
