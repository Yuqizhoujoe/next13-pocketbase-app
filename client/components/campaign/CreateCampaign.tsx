import { useEffect, useState } from "react";
import {
  CampaignFormInterface,
  CampaignInterface,
} from "../../../shared/modal/data/interface";
import Form from "../Common/Form/Form";
import BackButton from "../Common/Button/BackButton";
import Input from "../Common/Form/Input";
import Button from "../Common/Button/Button";
import { campaignAPIHandler, postCampaign } from "../../apis/campaign";
import { useMutation } from "@tanstack/react-query";
import { QUERIES } from "../../../shared/common/constant";
import { useRouter } from "next/router";

const initialCampaignForm: CampaignFormInterface = {
  campaignAddress: "",
  campaignName: "",
};

export default function CreateEditCampaign({
  campaign,
}: {
  campaign: CampaignInterface;
}) {
  const router = useRouter();
  const [form, setForm] = useState<CampaignFormInterface>(initialCampaignForm);
  const mutation = useMutation({
    mutationKey: [QUERIES.CREATE_CAMPAIGN],
    mutationFn: ({
      campaignId,
      campaignFormData,
    }: {
      campaignId: string;
      campaignFormData: CampaignFormInterface;
    }) =>
      campaignAPIHandler({
        campaignId,
        campaignFormData,
      }),
    onSuccess: async () => {
      await router.prefetch("/");
      await router.replace("/");
    },
  });

  useEffect(() => {
    setForm((prevForm) => {
      return {
        ...prevForm,
        campaignAddress: campaign.campaignAddress,
        campaignName: campaign.campaignName,
      };
    });
  }, []);

  const handleSubmit = async () => {
    const formData = {
      campaignName: form.campaignName,
      campaignAddress: form.campaignAddress,
    };
    mutation.mutate({
      campaignId: campaign && campaign.id,
      campaignFormData: formData,
    });
  };

  const handleNameChange = (campaignName: string, isNameValid: boolean) => {
    setForm((prevForm) => ({
      ...prevForm,
      campaignName,
      valid: isNameValid,
    }));
  };
  const handleCampaignAddressChange = (
    campaignAddress: string,
    isUrlValid: boolean
  ) => {
    setForm((prevForm) => ({
      ...prevForm,
      campaignAddress,
      valid: isUrlValid,
    }));
  };

  return (
    <div className="create_campaign_component flex flex-col items-center p-14">
      <Form
        className="h-1/2 w-full flex flex-col items-start justify-center"
        onSubmit={handleSubmit}
      >
        <BackButton />
        <Input
          type="text"
          name="campaignName"
          id="campaignName"
          required
          handleChange={handleNameChange}
          inputDivClassName="relative z-0 mt-6 w-full group"
          label="Campaign Name"
          initialValue={form.campaignName}
        />
        <Input
          type="text"
          name="campaignAddress"
          id="campaignAddress"
          required
          label="Campaign Address"
          initialValue={form.campaignAddress}
          inputDivClassName="relative z-0 mt-6 w-full group"
          handleChange={handleCampaignAddressChange}
        />
        <Button type="submit" label="Submit" />
      </Form>
    </div>
  );
}
