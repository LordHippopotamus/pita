"use server";

import { authOptions } from "@/lib";
import { promises as fs } from "fs";
import mime from "mime";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import path from "path";

export const uploadFile = async (formData: FormData) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw Error("Unauthorized");

  const file = formData.get("file");
  if (!file || !(file instanceof File)) throw Error("File required");
  console.log(mime.getType(file.name));
  if (!mime.getType(file.name)) throw Error("Wrong MIME type");

  const filePath = path.join(
    process.env.STORAGE_DIR as string,
    session.user.id,
    file.name
  );

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);
  revalidatePath("/dashboard[id]/storage");
};
