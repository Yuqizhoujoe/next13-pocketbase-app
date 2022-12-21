import { CampaignCard } from "../../shared/modal/Common/interface";
import Button from "@/components/Common/Button/Button";
import { handleCss } from "../../shared/helper";

const defaultCardDivCSS =
  "card flex flex-row p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700";

const Card = (props: CampaignCard) => {
  const { label, description, onClick, actionLabel, cardDivCss } = props;

  return (
    <div className={handleCss(defaultCardDivCSS, cardDivCss)}>
      <div className="card_text_content">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {label}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
      </div>
      {actionLabel && (
        <Button
          btnDivClassName="card_action relative z-0 mt-5 group"
          btnClassName="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 focus:ring-4 focus:outline-none focus:ring-red-100"
          label={actionLabel}
          type="button"
          handleClick={onClick}
        />
      )}
    </div>
  );
};

export default Card;
