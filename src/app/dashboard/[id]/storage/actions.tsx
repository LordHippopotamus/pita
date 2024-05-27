"use server";

import { authOptions } from "@/lib";
import { s3 } from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import mime from "mime";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const uploadFile = async (
  projectId: string,
  file: { name: string; body: string }
) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw Error("Unauthorized");

  const ContentType = mime.getType(file.name);
  if (!ContentType) throw Error("Wrong MIME type");

  const buffer = Buffer.from(file.body, "base64");

  await s3.send(
    new PutObjectCommand({
      Bucket: session.user.id + projectId,
      Key: file.name,
      Body: buffer,
      ContentType,
    })
  );

  revalidatePath("/dashboard[id]/storage");
};
