import { CardInterface } from "../../../../shared/modal/Common/interface";
import Button from "../Button/Button";
import { handleCss } from "../../../../lib/helper";

const defaultCardDivCSS =
  "card flex flex-row p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700";

const Card = (props: CardInterface) => {
  const {
    label,
    description,
    onClick,
    actionLabel,
    cardDivCss,
    renderActionItem,
  } = props;

  const renderCardActionContent = () => {
    if (!renderActionItem || typeof renderActionItem !== "function")
      return null;

    return <div className="card_action_content">{renderActionItem()}</div>;
  };

  return (
    <div
      className={`card_component ${handleCss(defaultCardDivCSS, cardDivCss)}`}
    >
      <div className="card_text_content">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {label}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
      </div>
      {renderCardActionContent()}
    </div>
  );
};

export default Card;
