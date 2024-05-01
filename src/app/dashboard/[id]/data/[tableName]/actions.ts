"use server";

import { getClientForProject } from "@/lib";
import { revalidatePath } from "next/cache";

export const createRecord = async ({
  projectId,
  tableName,
  data,
}: {
  projectId: string;
  tableName: string;
  data: { [key: string]: any };
}) => {
  const client = await getClientForProject(projectId);
  await client.connect();
  const query = `insert into ${tableName} (${Object.keys(data).join(
    ", "
  )}) values (${Object.values(data)
    .map((el) => `'${el}'`)
    .join(", ")})`;
  await client.query(query);
  await client.end();

  revalidatePath("/dashboard/[id]/[tableName]");
};

export const changeRecord = async (
  projectId: string,
  table: string,
  column: string,
  value: string,
  recordId: string
) => {
  const client = await getClientForProject(projectId);
  await client.connect();
  await client.query(
    `UPDATE ${table} SET ${column} = '${value}' WHERE id = ${recordId}`
  );
  await client.end();

  revalidatePath("/dashboard/[id]/[tableName]");

  return {
    ok: true,
    message: `A row has been updated`,
  };
};
