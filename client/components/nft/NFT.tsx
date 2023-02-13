import BackButton from "../Common/Button/BackButton";
import Button, { buttonStyle } from "../Common/Button/Button";
import { NFTInterface } from "../../../shared/modal/data/interface";
import { QUERIES, TEST_PARAGRAPH } from "../../../shared/common/constant";
import { useRouter } from "next/router";
import Image from "../Common/Image";
import { useMutation } from "@tanstack/react-query";
import { deleteNFT } from "../../apis/nft";
import Spinner from "../Common/Spinner";

export default function NFT({ nft }: { nft: NFTInterface }) {
  const router = useRouter();
  const deleteNFTMutation = useMutation({
    mutationKey: [QUERIES.DELETE_NFT],
    mutationFn: () => deleteNFT({ nftId: nft.id }),
    onSuccess: async () => {
      await router.prefetch("/");
      await router.replace("/");
    },
  });

  const isLoading = deleteNFTMutation.isLoading;

  const renderImage = () => {
    return <Image imageUrl={nft.imageUrl} alt={nft.name} height="max-h-96" />;
  };

  const handleEditBtnClick = async () => {
    await router.push(`${router.asPath}/edit`);
  };

  const handleDeleteBtnClick = async () => {
    deleteNFTMutation.mutate();
  };

  const renderButtons = () => {
    return (
      <>
        <Button
          label="Edit"
          btnDivClassName={buttonStyle.ButtonContainerNoMargin}
          handleClick={handleEditBtnClick}
        />
        <Button
          label="Delete"
          btnDivClassName={buttonStyle.ButtonContainerNoMargin}
          btnClassName={buttonStyle.Button.GradientOutline.PurpleToBlue.button}
          btnSpanClassName={
            buttonStyle.Button.GradientOutline.PurpleToBlue.span
          }
          handleClick={handleDeleteBtnClick}
        />
      </>
    );
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="nft_component">
      <div className="back_button_container flex justify-between items-center justify-items-center content-center">
        <BackButton />
      </div>
      <div className="flex flex-col items-center">
        <div className="nft_image_container">{renderImage()}</div>
        <div className="nft_content_container w-1/2 flex flex-col">
          <h3 className="text-2xl font-bold my-4 flex justify-between items-center content-center">
            {nft.name}
            <div className="nft_button_container flex flex-row">
              {renderButtons()}
            </div>
          </h3>
          <p className="font-bold text-lg mb-4">Price: ${nft.price}</p>
          <h4 className="nft_image_content_prompt text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Prompt:
          </h4>
          <p className="font-light text-gray-500 dark:text-gray-400 mb-4">
            {nft.prompt || TEST_PARAGRAPH.LONG_PARAGRAPH}
          </p>
        </div>
      </div>
    </div>
  );
}
