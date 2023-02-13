import { S3 } from "aws-sdk";

const s3 = new S3({
  accessKeyId: process.env.AWS_S3_USER_ACCESS_KEY,
  secretAccessKey: process.env.AWS_S3_USER_SECRET_KEY,
  region: "us-east-2",
});

const getSignedUrl = async (fileName: string) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileName,
    Expires: 60 * 60 * 5, // URL will be valid for 5 hours
  };

  const signedUrl = await s3.getSignedUrlPromise("getObject", params);

  return signedUrl;
};

const checkImageExist = async (fileName: string) => {
  const params: S3.Types.HeadObjectRequest = {
    Bucket: `${process.env.AWS_S3_BUCKET_NAME}`,
    Key: fileName,
  };
  return new Promise((resolve, reject) => {
    return s3.headObject(params, (err, data) => {
      if (err && err.code === "NotFound") {
        resolve(false);
      } else if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

export { getSignedUrl, checkImageExist, s3 as default };
