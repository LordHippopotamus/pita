"use server";

import { getClientForProject } from "@/lib";
import { revalidatePath } from "next/cache";

export const createTable = async (state: any, formData: FormData) => {
  try {
    const name = formData.get("name");
    const projectId = formData.get("projectId");

    if (
      !name ||
      !projectId ||
      typeof name !== "string" ||
      typeof projectId !== "string"
    )
      throw new Error("Project name or project id are not provided");

    const client = await getClientForProject(projectId);
    await client.connect();
    await client.query(`create table ${name} ()`);
    await client.end();

    revalidatePath("/dashboard/[id]");

    return {
      ok: true,
      message: `A table with name ${name} has been created`,
    };
  } catch (e: any) {
    return { ok: false, message: e.message };
  }
};
