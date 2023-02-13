import { NFTInterface } from "../../../shared/modal/data/interface";
import ImageCard from "../Common/Card/ImageCard";
import Button from "../Common/Button/Button";

export default function NFTs(props: { nfts: NFTInterface[] }) {
  const { nfts } = props;

  const renderNFTImageCard = () => {
    return Array.from(nfts, (nft, index) => {
      return (
        <div key={nft.id} className="nft_image_card_container">
          <ImageCard
            imageHeight="h-96"
            imageWidth="w-full"
            label={nft.name}
            price={nft.price}
            imageUrl={nft.imageUrl}
            to={`/nfts/${nft.id}`}
            imageCardContentDivCss="flex flex-col items-center"
            cardActionItemDivCss="w-full flex justify-center"
            renderActionItem={() => {
              if (nft.onSale) {
                return <Button label="Purchase" />;
              }

              return null;
            }}
          />
        </div>
      );
    });
  };

  return (
    <div className="nfts_component grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {renderNFTImageCard()}
    </div>
  );
}
