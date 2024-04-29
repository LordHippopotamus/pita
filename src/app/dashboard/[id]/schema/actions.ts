"use server";

import { getClientForProject } from "@/lib";
import { revalidatePath } from "next/cache";

export const createTable = async (projectId: string, name: string) => {
  const client = await getClientForProject(projectId);
  await client.connect();
  await client.query(`create table ${name} (id uuid)`);
  await client.end();

  revalidatePath("/dashboard/[id]");
};
