"use client";
import Link from "next/link";
import { NFTInterface } from "../../../shared/modal/data/interface";

export default function ImageComponent({
  imageUrl,
  alt,
  height,
  width,
  to,
  onError,
  nft,
}: {
  imageUrl: string;
  alt: string;
  height: string | number;
  width?: string | number;
  to?: string;
  onError?: () => any;
  nft?: NFTInterface;
}) {
  const imageHTML = (
    <div
      id="image_component"
      className={`rounded-lg hover:cursor-pointer hover:opacity-75 hover:scale-90`}
    >
      <img src={imageUrl} alt={alt} className={`${height} ${width}`} />
    </div>
  );

  return to ? <Link href={to}>{imageHTML}</Link> : imageHTML;
}
