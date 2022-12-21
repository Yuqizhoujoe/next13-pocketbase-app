import { IconInterface } from "../../../shared/modal/Common/interface";

const EthereumIcon = (props: IconInterface) => {
  const { css } = props;

  return (
    <svg
      className={`icon_container ${css}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
    >
      <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" />
    </svg>
  );
};

export default EthereumIcon;
