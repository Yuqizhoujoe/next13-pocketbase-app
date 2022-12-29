import { ARROW_DIRECTION } from "../../../../shared/common/constant";

const Arrow = ({
  direction,
  className,
  onClick,
}: {
  direction: string;
  className?: string;
  onClick: () => any;
}) => {
  const onArrowClick = (e: any) => {
    e.preventDefault();
    onClick();
  };

  const renderArrow = () => {
    switch (direction) {
      case ARROW_DIRECTION.LETF:
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        );
      case ARROW_DIRECTION.RIGHT:
      default:
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        );
    }
  };

  return (
    <div className={`arrow_container ${className}`} onClick={onArrowClick}>
      {renderArrow()}
    </div>
  );
};

export default Arrow;
