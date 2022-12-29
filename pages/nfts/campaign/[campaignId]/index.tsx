import { GetServerSidePropsContext } from "next";
import _ from "lodash";
import { NFTInterface } from "../../../../shared/modal/data/interface";
import { fetchCampaignById } from "../../../../server/pb/query/campaigns";
import NFTs from "../../../../client/components/nft/NFTs";

export default function NFTsContainer({ nfts }: { nfts: NFTInterface[] }) {
  return (
    <div className="nfts_container max-h-fit min-h-screen">
      <NFTs nfts={nfts} />
    </div>
  );
}

// {
//   "campaign": "2fvp1o7hvb0fant",
//     "collectionId": "bci9b3lo8i98emf",
//     "collectionName": "nfts",
//     "created": "2022-12-21 22:06:32.545Z",
//     "id": "1eehbcp59uzdd0w",
//     "imageUrl": "https://i.pinimg.com/originals/52/c2/4c/52c24ce9c55381c1db5b7b7bd559e2b3.jpg",
//     "name": "Joseph Joestar 1",
//     "onSale": true,
//     "price": 200,
//     "updated": "2022-12-21 22:06:32.545Z"
// }
export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log("NFTs server");
  const campaignId = _.get(context, "query.campaignId", "");
  const campaign = await fetchCampaignById(campaignId, "nfts");
  const campaignNFTs = _.get(campaign, "expand.nfts", []);

  return {
    props: {
      nfts: campaignNFTs,
    },
  };
}
