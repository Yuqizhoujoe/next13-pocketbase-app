import { handleCss } from "../../../../lib/helper";
import { ButtonInterface } from "../../../../shared/modal/Common/interface";
import { buttonType } from "../../../../shared/common/constant";

export const buttonStyle = {
  ButtonContainer: "relative z-0 mt-6 group",
  ButtonContainerNoMargin: "relative z-0 group",
  Button: {
    GradientOutline: {
      PurpleToBlue: {
        button:
          "relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800",
        span: "relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0",
      },
      RedToYellow: {
        button:
          "relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400",
        span: "relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0",
      },
    },
  },
};

const defaultButtonCss = buttonStyle.Button.GradientOutline;
const defaultButtonSpanCss =
  buttonStyle.Button.GradientOutline.RedToYellow.span;
const defaultButtonDivCss = buttonStyle.ButtonContainer;

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
          buttonStyle.ButtonContainer,
          btnDivClassName
        )}`}
      >
        <button
          className={handleCss(
            buttonStyle.Button.GradientOutline.RedToYellow.button,
            btnClassName
          )}
          type={type}
        >
          <span
            className={handleCss(
              buttonStyle.Button.GradientOutline.RedToYellow.span,
              btnSpanClassName
            )}
          >
            {label}
          </span>
        </button>
      </div>
    );
  }

  return (
    <div
      className={`button_component ${handleCss(
        buttonStyle.ButtonContainer,
        btnDivClassName
      )}`}
    >
      <button
        className={handleCss(
          buttonStyle.Button.GradientOutline.RedToYellow.button,
          btnClassName
        )}
        type={type}
        onClick={handleClickEvent}
      >
        <span
          className={handleCss(
            buttonStyle.Button.GradientOutline.RedToYellow.span,
            btnSpanClassName
          )}
        >
          {label}
        </span>
      </button>
    </div>
  );
};

export default Button;
