import { CardInterface } from "../../../../shared/modal/Common/interface";
import { formatCurrency, handleCss } from "../../../../lib/helper";
import Link from "next/link";

const defaultCardDivCSS =
  "card flex flex-row p-4 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700";

const ImageCard = (props: CardInterface) => {
  const {
    label,
    description,
    onClick,
    actionLabel,
    cardDivCss,
    renderActionItem,
    to,
    imageUrl,
    price,
    imageCardContentDivCss,
    cardActionItemDivCss,
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
          {/*@ts-ignore*/}
          <Link href={to}>
            <img
              className="h-44 w-full rounded-lg hover:cursor-pointer hover:opacity-75 hover:scale-90"
              src={imageUrl}
              alt={label}
            />
          </Link>
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
