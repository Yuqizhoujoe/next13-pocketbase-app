import CreateEditNFT from "../../client/components/nft/CreateEditNFT";
import { GetServerSidePropsContext } from "next";

export default function createNFT() {
  return (
    <div className="create_nft_page w-full h-screen">
      <CreateEditNFT />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {},
  };
}
