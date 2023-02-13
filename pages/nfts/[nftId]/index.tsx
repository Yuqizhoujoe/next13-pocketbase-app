import { GetServerSidePropsContext } from "next";
import _ from "lodash";
import { fetchNFTById } from "../../../server/pb/query/nfts";
import { parseJSONAPIObject } from "../../../lib/helper";
import { NFTInterface } from "../../../shared/modal/data/interface";
import NFT from "../../../client/components/nft/NFT";

export default function NFTContainer({ nft }: { nft: NFTInterface }) {
  return (
    <div className="nft_page w-full min-h-screen max-h-fit">
      <NFT nft={nft} />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const nftId = _.get(context, "query.nftId", "");
  const nftResponse = await fetchNFTById(nftId);
  const nft = parseJSONAPIObject(nftResponse);

  return {
    props: {
      nft,
    },
  };
}
