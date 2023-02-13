import {
  NFTFormInterface,
  NFTInterface,
} from "../../../shared/modal/data/interface";
import { useEffect, useState } from "react";
import Form from "../Common/Form/Form";
import BackButton from "../Common/Button/BackButton";
import Input from "../Common/Form/Input";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import _ from "lodash";
import { useMutation } from "@tanstack/react-query";
import { QUERIES } from "../../../shared/common/constant";
import { useRouter } from "next/router";
import { generateImageHandler } from "../../apis/openAI";
import { nftAPIsHandler } from "../../apis/nft";
import SpinnerButton from "../Common/Button/SpinnerButton";
import Spinner from "../Common/Spinner";

const BUTTON_STATE = {
  GENERATE: "GENERATE",
  DOWNLOAD: "DOWNLOAD",
  UPLOAD: "UPLOAD",
  SUBMIT: "SUBMIT",
};

const initialNFTForm: NFTFormInterface = {
  prompt: "",
  name: "",
  onSale: false,
  price: 0,
  valid: true,
  image: null,
  imageUrl: "",
  state: BUTTON_STATE.GENERATE,
};

export default function CreateEditNFT({ nft }: { nft?: NFTInterface }) {
  const router = useRouter();
  const [form, setForm] = useState<NFTFormInterface>(initialNFTForm);
  const generateImageMutation = useMutation({
    mutationKey: [QUERIES.GENERATE_IMAGE],
    mutationFn: (prompt: string) => generateImageHandler(prompt),
    onSuccess: async (data) => {
      const imageUrl = _.get(data, "data.url", "");

      setForm((prevForm) => {
        return {
          ...prevForm,
          imageUrl,
          state: BUTTON_STATE.DOWNLOAD,
        };
      });
    },
  });

  const submitNFTFormMutation = useMutation({
    mutationKey: [QUERIES.CREATE_NFT],
    mutationFn: (nftForm: NFTFormInterface) =>
      nftAPIsHandler({ nftId: nft?.id, nftForm }),
    onSuccess: async () => {
      // reset the form
      setForm({ ...initialNFTForm });

      await router.prefetch("/");
      await router.replace("/");
    },
  });

  const isLoading =
    submitNFTFormMutation.isLoading || generateImageMutation.isLoading;

  useEffect(() => {
    if (!_.isEmpty(nft)) {
      setForm((prevForm) => {
        return {
          ...prevForm,
          prompt: nft.prompt,
          onSale: nft.onSale,
          price: nft.price,
          name: nft.name,
          imageUrl: nft.imageUrl,
        };
      });
    }
  }, [nft]);

  const handleSubmit = () => {
    submitNFTFormMutation.mutate({ ...form });
  };

  const handleNameChange = (name: string, isNameValid: boolean) => {
    setForm((prevForm) => ({
      ...prevForm,
      name,
      valid: isNameValid,
    }));
  };
  const handlePriceChange = (price: number | string, isPriceValid: boolean) => {
    setForm((prevForm) => ({
      ...prevForm,
      price: typeof price === "string" ? parseInt(price) : price,
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
  const handleOnSaleChange = (onSale: boolean, isOnSaleValie: boolean) => {
    setForm((prevForm) => ({
      ...prevForm,
      onSale,
      valid: isOnSaleValie,
    }));
  };
  const handleFileUpload = (image: File | null, isImageValid: boolean) => {
    setForm((prevForm) => ({
      ...prevForm,
      image,
      imageUrl: image ? URL.createObjectURL(image) : prevForm.imageUrl,
      valid: isImageValid,
      state: BUTTON_STATE.SUBMIT,
    }));
  };

  const handleGenerateImageBtnClick = (e: any) => {
    e.preventDefault();
    generateImageMutation.mutate(form.prompt);
  };

  const handleDownloadBtnClick = (e: any) => {
    e.preventDefault();
    setForm((prevForm) => {
      return {
        ...prevForm,
        state: BUTTON_STATE.UPLOAD,
      };
    });
    window.open(form.imageUrl, "_blank");
  };

  const renderImageContainer = () => {
    if (isLoading) {
      return <Spinner />;
    }

    return (
      <div className="nft_image_container" id="nft-image-container">
        {form.valid && !_.isEmpty(form.imageUrl) && (
          <img
            className="max-h-96 rounded-lg hover:cursor-pointer hover:opacity-75"
            src={form.imageUrl}
            alt={form.name}
          />
        )}
      </div>
    );
  };

  const renderButton = () => {
    switch (form.state) {
      case BUTTON_STATE.DOWNLOAD:
        return (
          <Button
            variant="outlined"
            color="success"
            onClick={handleDownloadBtnClick}
          >
            Download
          </Button>
        );
      case BUTTON_STATE.UPLOAD:
        return (
          <Input
            type="file"
            name="file"
            id="file"
            inputDivClassName="relative z-0 mt-6 w-1/3 group"
            label="File"
            handleChange={handleFileUpload}
            required={false}
          />
        );
      case BUTTON_STATE.SUBMIT:
        return (
          <Button type="submit" variant="outlined" endIcon={<SendIcon />}>
            Submit
          </Button>
        );
      case BUTTON_STATE.GENERATE:
      default:
        return (
          <Button variant="outlined" onClick={handleGenerateImageBtnClick}>
            Generate Image
          </Button>
        );
    }
  };

  const renderButtonContainer = () => {
    if (isLoading) {
      return (
        <div className="nft_form_button_container mt-6">
          <SpinnerButton />
        </div>
      );
    }

    return (
      <div className="nft_form_button_container flex flex-row gap-2 mt-6">
        {renderButton()}
      </div>
    );
  };

  return (
    <div className="nft_component flex flex-col justify-start items-center">
      <Form className="p-6 h-fit w-full" onSubmit={handleSubmit}>
        <BackButton disabled={isLoading} />
        <div className="nft_form_container flex flex-row gap-10 items-center p-3">
          <div className="image_container">{renderImageContainer()}</div>
          <div className="input_container flex-auto">
            <Input
              type="text"
              name="name"
              id="name"
              required
              handleChange={handleNameChange}
              inputDivClassName="relative z-0 mt-6 w-2/3 group"
              label="NFT Name"
              initialValue={form.name}
            />
            <Input
              textbox
              type="text"
              name="prompt"
              id="prompt"
              required
              label="Prompt"
              placeholder="Enter Prompt to generate image"
              inputDivClassName="relative z-0 mt-6 w-2/3 group"
              initialValue={form.prompt}
              handleChange={handleImagePrompt}
              rows={4}
            />
            <Input
              type="checkbox"
              name="onSale"
              id="onSale"
              required={false}
              inputDivClassName="relative z-0 mt-6 w-1/3 group"
              handleChange={handleOnSaleChange}
              initialValue={form.onSale ? "Sell" : ""}
              label="Sale"
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
            {renderButtonContainer()}
          </div>
        </div>
      </Form>
    </div>
  );
}
