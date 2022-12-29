import { GridColDef } from "@mui/x-data-grid";
import { HTMLInputTypeAttribute } from "react";

export interface InputInterface {
  initialValue?: any;
  type?: HTMLInputTypeAttribute;
  textbox?: boolean;
  name: string;
  id: string;
  inputClassName?: string;
  labelClassName?: string;
  inputDivClassName?: string;
  money?: boolean;
  required: boolean;
  label: string;
  handleChange?: (value: any, valid: boolean) => any;
  validate?: (value: any) => boolean;
  rows?: number;
}

export interface ButtonInterface {
  label: string;
  btnClassName?: string;
  btnSpanClassName?: string;
  type?: "submit" | "reset" | "button";
  handleClick?: () => any;
  btnDivClassName?: string;
  disable?: boolean;
}

export interface LayoutInterface {
  children: JSX.Element | JSX.Element[];
}

export interface ListItemInterface {
  content: string;
  link: string;
  anchorClassName?: string;
  listItemClassName?: string;
}

export interface ListInterface {
  className?: string;
  children: JSX.Element | JSX.Element[];
}

export interface TableInterface {
  HeaderChildren: JSX.Element | JSX.Element[];
  BodyChildren: JSX.Element | JSX.Element[];
  quantity: number;
  perPage: number;
}

export interface TableItemInterface {
  text?: string;
  type?: string;
  renderItem?: () => any;
  onClick?: () => any;
  imageUrl?: string;
  imageCss?: string;
  tableCellCss?: string;
}

export interface TableRowInterface {
  children: JSX.Element | JSX.Element[];
  className?: string;
}

export interface DataTableInterface {
  rows: any[];
  cols: GridColDef[];
}

export interface FormInterface {
  onSubmit: () => any;
  className?: string;
  children: any;
  error?: any;
}

export interface FormInputActionInterface<T> {
  type: string;
  payload?: T;
}

export interface FormInputStateInterface<T> {
  value: T;
  touch: boolean;
}

export interface AlertInterface {
  message: string;
}

export interface CardInterface {
  label: string;
  cardDivCss?: string;
  description?: string | number;
  actionLabel?: string;
  onClick?: () => any;
  renderActionItem?: () => any;
  to?: string;
  imageUrl?: string;
  price?: number;
  imageCardContentDivCss?: string;
  cardActionItemDivCss?: string;
}

export interface BackButtonInterface {
  onClick: () => any;
}

export interface IconInterface {
  css?: string;
}
