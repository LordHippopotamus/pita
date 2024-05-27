import { S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: process.env.S3_REGION,
  forcePathStyle: true, // If you want to use virtual host addressing of buckets, you can remove `forcePathStyle: true`.
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
  },
});
