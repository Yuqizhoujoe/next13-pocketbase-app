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
  imageUrl: string;
  image: File | null;
  state?: string;
}

export interface UserSignUpInterface {
  email: string;
  password: string;
  username: string;
  name: string;
  passwordConfirm: string;
}

export interface UserSignUpFormInterface extends UserSignUpInterface {
  valid: boolean;
}

export interface UserLoginInterface {
  email: string;
  password: string;
}
