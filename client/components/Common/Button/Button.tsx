import { handleCss } from "../../../../lib/helper";
import { ButtonInterface } from "../../../../shared/modal/Common/interface";
import { buttonType } from "../../../../shared/common/constant";

const defaultButtonCss =
  "relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 focus:ring-4 focus:outline-none focus:ring-red-100";
const defaultButtonSpanCss =
  "relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0";
const defaultButtonDivCss = "relative z-0 mt-6 group";

const Button = (props: ButtonInterface) => {
  const {
    type,
    label,
    btnClassName,
    btnSpanClassName,
    handleClick,
    btnDivClassName,
  } = props;

  const handleClickEvent = (e: any) => {
    e.preventDefault();
    if (handleClick && typeof handleClick === "function") {
      handleClick();
    }
  };

  if (type === buttonType.SUBMIT) {
    return (
      <div
        className={`button_component ${handleCss(
          defaultButtonDivCss,
          btnDivClassName
        )}`}
      >
        <button
          className={handleCss(defaultButtonCss, btnClassName)}
          type={type}
        >
          <span className={handleCss(defaultButtonSpanCss, btnSpanClassName)}>
            {label}
          </span>
        </button>
      </div>
    );
  }

  return (
    <div
      className={`button_component ${handleCss(
        defaultButtonDivCss,
        btnDivClassName
      )}`}
    >
      <button
        className={handleCss(defaultButtonCss, btnClassName)}
        type={type}
        onClick={handleClickEvent}
      >
        <span className={handleCss(defaultButtonSpanCss, btnSpanClassName)}>
          {label}
        </span>
      </button>
    </div>
  );
};

export default Button;
