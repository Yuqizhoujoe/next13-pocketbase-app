import {
  CampaignInterface,
  NFTFormInterface,
  NFTInterface,
} from "../../../shared/modal/data/interface";
import { useEffect, useState } from "react";
import Form from "../Common/Form/Form";
import BackButton from "../Common/Button/BackButton";
import Input from "../Common/Form/Input";
import Button from "../Common/Button/Button";
import _ from "lodash";
import { useMutation } from "@tanstack/react-query";
import { QUERIES } from "../../../shared/common/constant";
import { nftAPIsHandler } from "../../apis/nft";
import { useRouter } from "next/router";

const initialNFTForm: NFTFormInterface = {
  prompt: "",
  name: "",
  onSale: false,
  price: 0,
  valid: true,
};

// TODO: integrate with Image generation DALL-E OpenAI to auto generate image
export default function CreateEditNFT({
  nft,
  campaign,
}: {
  nft?: NFTInterface;
  campaign: CampaignInterface;
}) {
  const router = useRouter();
  const [form, setForm] = useState<NFTFormInterface>(initialNFTForm);
  const mutation = useMutation({
    mutationKey: [QUERIES.CREATE_NFT],
    mutationFn: ({
      nftForm,
      nftId,
      campaignId,
    }: {
      nftForm: NFTFormInterface;
      nftId?: string;
      campaignId: string;
    }) => nftAPIsHandler({ nftId, nftForm, campaignId }),
    onSuccess: async () => {
      await router.prefetch(`/nfts/campaign/${campaign.id}/`);
      await router.replace(`/nfts/campaign/${campaign.id}/`);
    },
  });

  useEffect(() => {
    if (!_.isEmpty(nft)) {
      setForm((prevForm) => {
        return {
          ...prevForm,
          prompt: nft.prompt,
          onSale: nft.onSale,
          price: nft.price,
          name: nft.name,
        };
      });
    }
  }, [nft]);

  const handleSubmit = () => {
    mutation.mutate({
      nftForm: form,
      nftId: nft?.id,
      campaignId: campaign.id,
    });
  };

  const handleNameChange = (name: string, isNameValid: boolean) => {
    setForm((prevForm) => ({
      ...prevForm,
      name,
      valid: isNameValid,
    }));
  };
  const handlePriceChange = (price: number, isPriceValid: boolean) => {
    setForm((prevForm) => ({
      ...prevForm,
      price,
      valid: isPriceValid,
    }));
  };
  const handleImagePrompt = (prompt: string, isPromptValid: boolean) => {
    setForm((prevForm) => ({
      ...prevForm,
      prompt,
      valid: isPromptValid,
    }));
  };

  // const renderImageContainer = () => {
  //   return (
  //     <div className="nft_image_container">
  //       {form.valid && !_.isEmpty(nft.imageUrl) && (
  //         <img
  //           className="h-72 rounded-lg hover:cursor-pointer hover:opacity-75"
  //           src={nft.imageUrl}
  //           alt={form.name}
  //         />
  //       )}
  //     </div>
  //   );
  // };

  return (
    <div className="nft_component flex flex-col justify-start items-center">
      <Form className="p-6 h-fit w-full" onSubmit={handleSubmit}>
        <div className="nft_form_container flex-auto p-3">
          <BackButton />
          {/*{renderImageContainer()}*/}
          <Input
            type="text"
            name="name"
            id="name"
            required
            handleChange={handleNameChange}
            inputDivClassName="relative z-0 mt-6 w-2/3 group"
            label="CreateEditNFT Name"
            initialValue={form.name}
          />
          <Input
            type="text"
            name="prompt"
            id="prompt"
            required
            label="Enter Prompt to generate image"
            handleChange={handleImagePrompt}
          />
          <Input
            type="number"
            name="price"
            id="price"
            required
            inputDivClassName="relative z-0 mt-6 w-1/3 group"
            handleChange={handlePriceChange}
            label="Price"
            money
            initialValue={form.price}
          />
          <Button type="submit" label="Submit" />
        </div>
      </Form>
    </div>
  );
}
