import { NFTFormInterface } from "../../shared/modal/data/interface";
import s3, { checkImageExist, getSignedUrl } from "../../aws/s3";
import _ from "lodash";
import axios from "../axios/instance";

const NFT_URL = "/pb/nft";

const uploadImageToS3 = async (image: File) => {
  const key = image.name.toUpperCase();
  const params: any = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
    Body: image,
    ACL: "private",
  };

  try {
    const isImageExist = await checkImageExist(key);
    /*{
          "ServerSideEncryption": "AES256",
            "Location": "https://nextjs-s3-bucket.s3.us-east-2.amazonaws.com/HD%20wallpaper_%20Anime%2C%20Your%20Name_.jpeg",
            "key": "HD wallpaper_ Anime, Your Name_.jpeg",
            "Key": "HD wallpaper_ Anime, Your Name_.jpeg",
            "Bucket": "nextjs-s3-bucket"
        }*/
    if (!isImageExist) {
      await s3.upload(params).promise();
    }

    const signedUrl = await getSignedUrl(key);
    return signedUrl;
  } catch (e) {
    console.error(e);
  }
};

const imageHandler = async (imageFile: File) => {
  let imageUrl = "";

  if (imageFile && imageFile.name) {
    const imageSignedUrl = await uploadImageToS3(imageFile);
    imageUrl = `${imageSignedUrl}`;
  }

  return imageUrl;

  // user generate image from openAI
  // TODO: openAI doesn't allow me to screenshot their images
  /*return new Promise((resolve, reject) => {
    const imageHTMLElement = document.getElementById("nft-image-container");
    if (imageHTMLElement) {
      return html2canvas(imageHTMLElement).then((canvas) =>
        canvas.toBlob(async (blob) => {
          if (blob) {
            const imageType = extractImageType(blob.type);
            const image = new File([blob], `${imageName}.${imageType}`, {
              type: blob.type,
            });
            console.log(image);
            const imageUrl = await imageUploadHandler(image);
            console.log(imageUrl);
            resolve(imageUrl);
          }

          reject("Image Blob is not existed!");
        })
      );
    }

    reject("imageHTMLElement is not existed!");
  });*/
};

export const nftAPIsHandler = async ({
  nftId,
  nftForm,
}: {
  nftId?: string;
  nftForm: NFTFormInterface;
}) => {
  if (nftId)
    return updateNFT({
      nftId,
      nftForm,
    });

  return createNFT({
    nftForm,
  });
};

export const createNFT = async ({ nftForm }: { nftForm: NFTFormInterface }) => {
  const image = nftForm.image;
  let imageUrl = nftForm.imageUrl;

  // get signed url from aws s3 bucket then save the url into the pocketbase
  if (image && image.name && image.size > 0) {
    imageUrl = await imageHandler(image);
  }

  const data = {
    ...nftForm,
    imageUrl,
  };

  return axios.post(NFT_URL, data).then((res) => res.data);
};

export const updateNFT = async ({
  nftId,
  nftForm,
}: {
  nftId: string;
  nftForm: NFTFormInterface;
}) => {
  const image = _.get(nftForm, "image", null);

  if (image && image.name) {
    const imageSignedUrl = await uploadImageToS3(image);
    nftForm.imageUrl = `${imageSignedUrl}`;
  }

  return axios.put(NFT_URL, { nftId, nftForm }).then((res) => res.data);
};

export const deleteNFT = async ({ nftId }: { nftId: string }) => {
  return axios.delete(`${NFT_URL}?nftId=${nftId}`).then((res) => res.data);
};
