import { ImageCardInterface } from "../../../../shared/modal/Common/interface";
import { formatCurrency, handleCss } from "../../../../lib/helper";
import Image from "../Image";
import { cardStyle } from "../../../../shared/common/cssConstants";

const defaultCardDivCSS = cardStyle.CardContainer;

const ImageCard = (props: ImageCardInterface) => {
  const {
    label,
    cardDivCss,
    renderActionItem,
    to,
    imageUrl,
    price,
    imageCardContentDivCss,
    cardActionItemDivCss,
    imageWidth,
    imageHeight,
    nft,
  } = props;

  const renderImageCardActionContent = () => {
    if (!renderActionItem || typeof renderActionItem !== "function")
      return null;

    return (
      <div className={`card_action_content ${cardActionItemDivCss}`}>
        {renderActionItem()}
      </div>
    );
  };

  return (
    <div
      className={`image_card_component ${handleCss(
        defaultCardDivCSS,
        cardDivCss
      )}`}
    >
      <div className={`image_card_content w-full ${imageCardContentDivCss}`}>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {label}
        </h5>
        <div className="w-full h-full overflow-hidden flex justify-center">
          <Image
            nft={nft}
            imageUrl={imageUrl}
            alt={label}
            height={imageHeight}
            width={imageWidth}
            to={to}
          />
        </div>
        <span className="text-3xl font-bold mt-3 dark:text-white">
          {formatCurrency(price)}
        </span>
        {renderImageCardActionContent()}
      </div>
    </div>
  );
};

export default ImageCard;
