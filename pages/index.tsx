import { GetServerSidePropsContext } from "next";
import { parseJSONAPIObject } from "../lib/helper";
import { NFTInterface } from "../shared/modal/data/interface";
import { fetchAllNFTs } from "../server/pb/query/nfts";
import dynamic from "next/dynamic";
import Spinner from "../client/components/Common/Spinner";

const NFTs = dynamic(() => import("../client/components/nft/NFTs"), {
  loading: () => <Spinner />,
});

export default function Home({ nfts }: { nfts: NFTInterface[] }) {
  return (
    <div className="home_page min-h-screen max-h-fit">
      <NFTs nfts={nfts} />
    </div>
  );
}

export async function getStaticProps(context: GetServerSidePropsContext) {
  console.log("Home page");
  const response = await fetchAllNFTs();
  const nfts = parseJSONAPIObject(response);

  // validate imageUrl
  // @ts-ignore
  // const nftsPromiseArray = nfts.map(validateImageUrl);
  // const nftsPromiseResult = await Promise.all(nftsPromiseArray);

  return {
    props: { nfts },
  };
}
