import { GetServerSideProps, GetServerSidePropsContext } from "next";
import _ from "lodash";
import { fetchNFTById } from "../../../server/pb/query/nfts";
import { parseJSONAPIObject } from "../../../lib/helper";
import { NFTInterface } from "../../../shared/modal/data/interface";
import CreateEditNFT from "../../../client/components/nft/CreateEditNFT";

export default function EditNFT({ nft }: { nft: NFTInterface }) {
  return (
    <div className="edit_nft_page w-full min-h-screen max-h-fit">
      <CreateEditNFT nft={nft} />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const nftId = _.get(context, "query.nftId", "");
  const nftResponse = await fetchNFTById(nftId);
  const nft = parseJSONAPIObject(nftResponse);

  return {
    props: { nft },
  };
}
