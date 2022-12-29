export interface CampaignInterface {
  id: string;
  campaignAddress: string;
  campaignName: string;
  nfts?: string[];
}

export interface CampaignFormInterface {
  campaignAddress: string;
  campaignName: string;
}

export interface NFTInterface {
  id: string;
  imageUrl: string;
  name: string;
  onSale: boolean;
  price: number;
  prompt: string;
}

export interface NFTFormInterface {
  prompt: string;
  name: string;
  onSale: boolean;
  price: number;
  valid: boolean;
}
